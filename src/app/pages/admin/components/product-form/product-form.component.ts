import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  Product,
  ProductCategory,
  UnitOfWeight,
  SelectOption,
} from 'core/models';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  @Input() public product?: Product;

  public form: FormGroup;

  get title(): string {
    return this.product ? 'Edit product' : 'Add new product';
  }
  get submitText(): string {
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

  public constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      name: ['', [Validators.required]],
      category: [null as ProductCategory | null, [Validators.required]],
      ingredients: [''],
      price: [
        null as number | null,
        [Validators.required, Validators.min(0.01)],
      ],
      weight: formBuilder.group({
        value: [
          null as number | null,
          [Validators.required, Validators.min(0)],
        ],
        unit: [null as UnitOfWeight | null, [Validators.required]],
      }),
      nutrients: formBuilder.group({
        protein: [
          null as number | null,
          [Validators.required, Validators.min(0)],
        ],
        fat: [null as number | null, [Validators.required, Validators.min(0)]],
        carbs: [
          null as number | null,
          [Validators.required, Validators.min(0)],
        ],
      }),
      kiloCalories: [
        null as number | null,
        [Validators.required, Validators.min(0)],
      ],
      shelfLife: formBuilder.group({
        months: [
          null as number | null,
          [Validators.min(0), Validators.pattern(/^[0-9]+$/)],
        ],
        weeks: [
          null as number | null,
          [Validators.min(0), Validators.pattern(/^[0-9]+$/)],
        ],
        days: [
          null as number | null,
          [Validators.min(0), Validators.pattern(/^[0-9]+$/)],
        ],
        hours: [
          null as number | null,
          [Validators.min(0), Validators.pattern(/^[0-9]+$/)],
        ],
      }),
      image: [null as File | null],
    });
  }
}
