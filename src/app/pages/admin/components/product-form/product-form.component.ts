import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  Product,
  ProductCategory,
  UnitOfWeight,
  SelectOption,
} from 'core/models';
import { ComboFieldValidator } from 'core/validators';

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

  public constructor(
    formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data?: ProductDialogData
  ) {
    this.product = data?.product;

    this.form = formBuilder.group({
      name: [this.product?.name, [Validators.required]],
      category: [this.product?.category, [Validators.required]],
      ingredients: [this.product?.ingredients],
      price: [this.product?.price, [Validators.required, Validators.min(0.01)]],
      weight: formBuilder.group(
        {
          value: [this.product?.weight?.value, [Validators.min(0)]],
          unit: [this.product?.weight?.unit],
        },
        {
          validators: [ComboFieldValidator.allOrNone],
        }
      ),
      nutrients: formBuilder.group({
        proteins: [this.product?.nutrients?.proteins, [Validators.min(0)]],
        fats: [this.product?.nutrients?.fats, [Validators.min(0)]],
        carbs: [this.product?.nutrients?.carbs, [Validators.min(0)]],
      }),
      kiloCalories: [this.product?.kiloCalories, [Validators.min(0)]],
      shelfLife: formBuilder.group({
        months: [
          this.product?.shelfLife?.months,
          [Validators.min(0), Validators.pattern(/^[0-9]+$/)],
        ],
        weeks: [
          this.product?.shelfLife?.weeks,
          [Validators.min(0), Validators.pattern(/^[0-9]+$/)],
        ],
        days: [
          this.product?.shelfLife?.days,
          [Validators.min(0), Validators.pattern(/^[0-9]+$/)],
        ],
        hours: [
          this.product?.shelfLife?.hours,
          [Validators.min(0), Validators.pattern(/^[0-9]+$/)],
        ],
      }),
      image: [null as File | null], // TODO
    });
  }
}
