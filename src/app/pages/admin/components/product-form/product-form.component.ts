import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  Product,
  ProductCategory,
  UnitOfWeight,
  SelectOption,
} from 'core/models';
import { ComboFieldValidator, NumberValidator } from 'core/validators';
import { EarlyErrorStateMatcher } from 'core/classes';

interface ProductDialogData {
  product?: Product;
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  public form!: FormGroup;
  private product?: Product;

  public get title(): string {
    return this.product ? 'Edit product' : 'Add new product';
  }

  public get submitText(): string {
    return this.product ? 'Save changes' : 'Create product';
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

  public constructor(
    formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data?: ProductDialogData
  ) {
    this.product = data?.product;

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
      image: [null as File | null], // TODO
    });
  }
}
