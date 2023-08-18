import {
  ChangeDetectionStrategy,
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

import { ProductQuantityDto } from 'core/models/fridge/product-quantity-dto.interface';
import { ProductQuantity } from 'core/models/fridge/product-quantity.interface';
import { NumberValidators } from 'core/validators/number/number.validators';
import {
  Subject,
  distinctUntilChanged,
  filter,
  map,
  take,
  takeUntil,
} from 'rxjs';
import { ChangeEventHandler } from 'utils/form/form.utils';

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
  public form = this.formBuilder.group({
    productQuantities: this.formBuilder.array([] as FormGroup[]),
  });

  public get productEntries(): FormArray {
    return this.form.get('productQuantities') as FormArray;
  }

  public get productQuantities(): ProductQuantity[] {
    return this.productEntries.value;
  }

  private notifyChangeListener: ChangeEventHandler<
    ProductQuantityDto[]
  > | null = null;
  private notifyTouchedListener: VoidFunction | null = null;

  private destroy$ = new Subject();

  public constructor(private formBuilder: FormBuilder) {
    this.addProductEntry = this.addProductEntry.bind(this);
  }

  public ngOnInit(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ productQuantities }): void => {
        productQuantities && this.notifyChangeListener?.(productQuantities);
      });

    this.form.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        map((): boolean => {
          return this.form.touched;
        }),
        distinctUntilChanged(),
        filter((touched: boolean): boolean => {
          return touched === true;
        }),
        take(1)
      )
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
    changeEventHandler: ChangeEventHandler<ProductQuantityDto[]>
  ): void {
    this.notifyChangeListener = changeEventHandler;
  }

  public registerOnTouched(touchedEventHandler: VoidFunction): void {
    this.notifyTouchedListener = touchedEventHandler;
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
}
