import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControlStatus, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, combineLatest, map, startWith, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import { Product } from 'core/models/product/product.interface';
import { ProductFields } from 'core/models/product/product-fields.interface';
import { ProductCategory } from 'core/models/product/product-category.enum';
import { UnitOfWeight } from 'core/models/product/unit-of-weight.enum';
import { SelectOption } from 'core/models/ui/select-option.interface';
import { ComboFieldValidator } from 'core/validators/combo-field/combo-field.validator';
import { NumberValidator } from 'core/validators/number/number.validator';
import { ComboErrorStateMatcher } from 'core/classes/combo-error-state-matcher/combo-error-state-matcher.class';
import { EarlyErrorStateMatcher } from 'core/classes/early-error-state-matcher/early-error-state-matcher.class';
import { FileWithUrl } from 'core/classes/file-with-url/file-with-url.class';
import { ProductsActions } from 'app/state/products/products.actions';
import { selectProductSubmitting } from 'app/state/products/products.selectors';

interface ProductDialogData {
  product?: Product;
  image?: FileWithUrl | null;
}

enum FormMode {
  Create,
  Edit,
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private product = this.data?.product;
  private productImage = this.data?.image;
  private initialProductImageUrl = this.product?.imageUrl;

  public form = this.formBuilder.group({
    name: [this.product?.name, [Validators.required]],
    category: [this.product?.category, [Validators.required]],
    ingredients: [this.product?.ingredients],
    price: [
      this.product?.price,
      [
        Validators.required,
        NumberValidator.number,
        Validators.min(0),
        NumberValidator.maxFractionDigits(2),
      ],
    ],
    weight: this.formBuilder.group(
      {
        value: [
          this.product?.weight?.value,
          [NumberValidator.number, Validators.min(0)],
        ],
        unit: [this.product?.weight?.unit],
      },
      {
        validators: [ComboFieldValidator.allOrNone],
      }
    ),
    nutrients: this.formBuilder.group({
      proteins: [
        this.product?.nutrients?.proteins,
        [NumberValidator.number, Validators.min(0)],
      ],
      fats: [
        this.product?.nutrients?.fats,
        [NumberValidator.number, Validators.min(0)],
      ],
      carbs: [
        this.product?.nutrients?.carbs,
        [NumberValidator.number, Validators.min(0)],
      ],
    }),
    kiloCalories: [
      this.product?.kiloCalories,
      [NumberValidator.number, Validators.min(0)],
    ],
    shelfLife: this.formBuilder.group({
      months: [
        this.product?.shelfLife?.months,
        [NumberValidator.number, NumberValidator.integer, Validators.min(0)],
      ],
      weeks: [
        this.product?.shelfLife?.weeks,
        [NumberValidator.number, NumberValidator.integer, Validators.min(0)],
      ],
      days: [
        this.product?.shelfLife?.days,
        [NumberValidator.number, NumberValidator.integer, Validators.min(0)],
      ],
      hours: [
        this.product?.shelfLife?.hours,
        [NumberValidator.number, NumberValidator.integer, Validators.min(0)],
      ],
    }),
    image: [this.productImage],
  });

  public get title(): string {
    return this.product ? 'Edit product' : 'Add new product';
  }

  public get submitText(): string {
    return this.product ? 'Save changes' : 'Create product';
  }

  private get mode(): FormMode {
    return this.product ? FormMode.Edit : FormMode.Create;
  }

  // TODO: fetch on startup and select from store
  public productCategories: SelectOption[] = [
    { value: ProductCategory.Soups, label: 'Soups' },
    { value: ProductCategory.SecondCourses, label: 'Second courses' },
    { value: ProductCategory.Salads, label: 'Salads' },
    { value: ProductCategory.Snacks, label: 'Snacks' },
    { value: ProductCategory.Drinks, label: 'Drinks' },
    { value: ProductCategory.Desserts, label: 'Desserts' },
  ];

  // TODO: fetch on startup and select from store
  public weightUnits: SelectOption[] = [
    { value: UnitOfWeight.Grams, label: 'g' },
    { value: UnitOfWeight.Milliliters, label: 'ml' },
  ];

  public earlyErrorStateMatcher = new EarlyErrorStateMatcher();
  public comboErrorStateMatcher = new ComboErrorStateMatcher();

  private pristine$ = this.form.valueChanges.pipe(
    map((): boolean => {
      return this.form.pristine;
    }),
    startWith(this.form.pristine)
  );

  private invalid$ = this.form.statusChanges.pipe(
    map((status: FormControlStatus): boolean => {
      return !(status === 'VALID');
    }),
    startWith(this.form.invalid)
  );

  private submitted$ = new Subject<boolean>();

  private submitting$ = this.store
    .select(selectProductSubmitting(this.product?.id || null))
    .pipe(startWith(false));

  public submitDisabled$ = combineLatest([
    this.pristine$,
    this.invalid$,
    this.submitting$,
  ]).pipe(
    map(([pristine, invalid, submitting]) => {
      return pristine || invalid || submitting;
    })
  );

  private canClose$ = combineLatest([this.submitted$, this.submitting$]).pipe(
    map(([submitted, submitting]) => {
      return submitted && !submitting;
    })
  );

  private destroy$ = new Subject();

  public constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: ProductDialogData
  ) {}

  public ngOnInit(): void {
    this.canClose$
      .pipe(takeUntil(this.destroy$))
      .subscribe((canClose: boolean) => {
        if (canClose) {
          this.dialogRef.close();
        }
      });
  }

  public ngOnDestroy(): void {
    this.submitted$.complete();
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const productData = {
      ...this.form.value,
      imageUrl: this.form.value.image?.url || null,
    } as ProductFields;

    switch (this.mode) {
      case FormMode.Create:
        this.store.dispatch(
          ProductsActions.createProduct({
            productData,
          })
        );
        break;
      case FormMode.Edit:
        this.store.dispatch(
          ProductsActions.updateProduct({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            id: this.product!.id,
            productData,
          })
        );
        break;
      default:
        throw new Error('Unsupported form mode');
    }

    this.submitted$.next(true);
  }
}
