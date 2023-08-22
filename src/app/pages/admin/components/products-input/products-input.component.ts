import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TrackByFunction,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
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

import { ProductQuantity } from 'core/models/fridge/product-quantity.interface';
import { NumberValidators } from 'core/validators/number/number.validators';
import { ChangeEventHandler } from 'utils/form/form.utils';
import { ConfirmDeleteComponent } from 'shared/components/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-products-input',
  templateUrl: './products-input.component.html',
  styleUrls: ['./products-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProductsInputComponent),
      multi: true,
    },
  ],
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
      .pipe(takeUntil(this.destroy$), take(1))
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
}
