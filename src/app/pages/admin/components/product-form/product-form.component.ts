import { Component, Inject, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControlStatus,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  Observable,
  Subject,
  combineLatest,
  map,
  startWith,
  takeUntil,
} from 'rxjs';
import { Store } from '@ngrx/store';

import {
  Product,
  ProductCategory,
  UnitOfWeight,
  SelectOption,
  ProductFields,
} from 'core/models';
import { ComboFieldValidator, NumberValidator } from 'core/validators';
import {
  ComboErrorStateMatcher,
  EarlyErrorStateMatcher,
  FileWithUrl,
} from 'core/classes';
import {
  ProductsActions,
  SubmitStatus,
  selectProductSubmitStatus,
} from 'app/state/products';

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
export class ProductFormComponent implements OnDestroy {
  public form!: FormGroup;
  private product?: Product;
  private productImage?: FileWithUrl | null;
  private initialProductImageUrl = this.product?.imageUrl;

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

  private invalid$: Observable<boolean>;
  private submitting$: Observable<boolean>;
  public submitDisabled$: Observable<boolean>;
  private destroy$ = new Subject();

  public constructor(
    formBuilder: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) data?: ProductDialogData
  ) {
    this.product = data?.product;
    this.productImage = data?.image;

    this.form = formBuilder.group({
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
      weight: formBuilder.group(
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
      nutrients: formBuilder.group({
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
      shelfLife: formBuilder.group({
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

    this.invalid$ = this.form.statusChanges.pipe(
      takeUntil(this.destroy$),
      map((status: FormControlStatus): boolean => {
        return !(status === 'VALID');
      }),
      startWith(true)
    );

    this.submitting$ = this.store
      .select(selectProductSubmitStatus(this.product?.id || null))
      .pipe(
        takeUntil(this.destroy$),
        map((status: SubmitStatus | undefined): boolean => {
          return status !== undefined;
        }),
        startWith(false)
      );

    this.submitDisabled$ = combineLatest([
      this.invalid$,
      this.submitting$,
    ]).pipe(
      takeUntil(this.destroy$),
      map(([invalid, submitting]) => {
        return invalid || submitting;
      })
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const productData: ProductFields = {
      ...this.form.value,
      imageUrl: this.form.value.image?.url || null,
    };

    switch (this.mode) {
      case FormMode.Create:
        return this.store.dispatch(
          ProductsActions.createProduct({
            productData,
          })
        );
      case FormMode.Edit:
        return this.store.dispatch(
          ProductsActions.updateProduct({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            id: this.product!.id,
            productData,
          })
        );
      default:
        throw new Error('Unsupported form mode');
    }
  }
}
