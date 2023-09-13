import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  TrackByFunction,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {
  Subject,
  distinctUntilChanged,
  filter,
  map,
  take,
  takeUntil,
} from 'rxjs';

import { ProductQuantity } from '@shell/core/models/fridge/product-quantity.interface';
import { NumberValidators } from '@shell/core/validators/number/number.validators';
import {
  ChangeEventHandler,
  ngValueAccessorProvider,
} from '@shell/utils/form/form.utils';
import { ConfirmDeleteComponent } from '@shell/shared/components/confirm-delete/confirm-delete.component';
import { Product } from '@shell/core/models/product/product.interface';
import { ProductAutocompleteComponent } from '../product-autocomplete/product-autocomplete.component';
import { CounterInputComponent } from '@shell/shared/components/counter-input/counter-input.component';

@Component({
  selector: 'app-products-input',
  templateUrl: './products-input.component.html',
  styleUrls: ['./products-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ngValueAccessorProvider(ProductsInputComponent)],
})
export class ProductsInputComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  public dataSource = new MatTableDataSource<ProductQuantity>([]);
  public tableColumns: string[] = ['product', 'quantity', 'actions'];

  public form = this.formBuilder.group({
    productQuantities: this.formBuilder.array([] as FormGroup[]),
  });

  public get productEntries(): FormArray {
    return this.form.get('productQuantities') as FormArray;
  }

  private notifyChangeListener: ChangeEventHandler<ProductQuantity[]> | null =
    null;
  private notifyTouchedListener: VoidFunction | null = null;

  private destroy$ = new Subject();

  private touched$ = this.form.valueChanges.pipe(
    map((): boolean => {
      return this.form.touched;
    }),
    distinctUntilChanged(),
    filter((touched: boolean): boolean => {
      return touched === true;
    })
  );

  private pendingFocusIndex: number | null = null;

  @ViewChild(ProductAutocompleteComponent)
  private productAutocomplete: ProductAutocompleteComponent;

  @ViewChildren(CounterInputComponent)
  private quantityInputs: QueryList<CounterInputComponent>;

  public constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private viewRef: ChangeDetectorRef
  ) {
    this.addProductEntry = this.addProductEntry.bind(this);
  }

  public ngOnInit(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ productQuantities }): void => {
        this.dataSource.data = productQuantities ?? [];
        productQuantities && this.notifyChangeListener?.(productQuantities);
      });

    this.touched$
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((): void => {
        this.notifyTouchedListener?.();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public writeValue(productQuantities: ProductQuantity[] | undefined): void {
    this.productEntries.clear();
    productQuantities?.forEach(this.addProductEntry);
  }

  public registerOnChange(
    onChangeCallback: ChangeEventHandler<ProductQuantity[]>
  ): void {
    this.notifyChangeListener = onChangeCallback;
  }

  public registerOnTouched(onTouchedCallback: VoidFunction): void {
    this.notifyTouchedListener = onTouchedCallback;
  }

  public setDisabledState?(isDisabled: boolean): void {
    // TODO
  }

  public productQtyTrackBy: TrackByFunction<ProductQuantity> = (_, item) => {
    return item.product?.id;
  };

  private addProductEntry({ product, quantity }: ProductQuantity): void {
    const productEntry = this.formBuilder.group({
      product: [product, [Validators.required]],
      quantity: [
        quantity,
        [NumberValidators.number, NumberValidators.integer, Validators.min(0)],
      ],
    });

    this.productEntries.push(productEntry);
  }

  private removeProductEntry(index: number): void {
    this.productEntries.removeAt(index);

    if (this.productEntries.length === 0) {
      // Force matNoDataRow template update,
      // otherwise colspan binding is not updated
      this.viewRef.detectChanges();
    }
  }

  public openDeleteProductQtyDialog(index: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        itemType: $localize`:@@product:product`,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((deleteConfirmed: boolean) => {
        if (deleteConfirmed) {
          this.removeProductEntry(index);
        }
      });
  }

  public upsertProduct(product: Product): void {
    let productIndex = (
      this.productEntries.value as ProductQuantity[]
    ).findIndex((productQty: ProductQuantity): boolean => {
      return productQty.product?.id === product.id;
    });

    if (productIndex < 0) {
      // Add new product entry
      // By default, quantity is initialized to 1
      this.addProductEntry({ product, quantity: 1 });
      this.viewRef.detectChanges(); // update this.quantityInputs QueryList
      productIndex = this.productEntries.length - 1;
    }

    // Save quantity input index to focus
    // Need to enqueue because autocomplete intercepts focus on close
    this.pendingFocusIndex = productIndex;

    this.productAutocomplete?.reset();
  }

  public onAutocompleteClose(): void {
    if (this.pendingFocusIndex !== null) {
      const inputToFocus = this.quantityInputs.get(this.pendingFocusIndex);
      inputToFocus?.focus();
      this.pendingFocusIndex = null;
    }
  }
}
