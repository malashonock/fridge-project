import { InjectionToken, Provider } from '@angular/core';

import { ProductCategory } from 'product-domain';

export const productCategories: ProductCategory[] = [
  ProductCategory.Soups,
  ProductCategory.SecondCourses,
  ProductCategory.Salads,
  ProductCategory.Snacks,
  ProductCategory.Drinks,
  ProductCategory.Desserts,
];

export const PRODUCT_CATEGORIES = new InjectionToken<ProductCategory[]>(
  'PRODUCT_CATEGORIES'
);

export const provideProductCategories = (): Provider => ({
  provide: PRODUCT_CATEGORIES,
  useValue: productCategories,
});
