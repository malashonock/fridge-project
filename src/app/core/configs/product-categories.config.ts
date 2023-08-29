import { InjectionToken, Provider } from '@angular/core';

import { ProductCategory } from 'core/models/product/product-category.enum';

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

export const productCategoriesProvider: Provider = {
  provide: PRODUCT_CATEGORIES,
  useValue: productCategories,
};
