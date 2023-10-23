import { Pipe, PipeTransform } from '@angular/core';

import { ProductCategory } from 'product-domain';

@Pipe({
  name: 'productCategoryLabel',
  standalone: true,
})
export class ProductCategoryLabelPipe implements PipeTransform {
  public transform(category: ProductCategory): string {
    return (() => {
      switch (category) {
        case ProductCategory.Soups:
          return $localize`:@@soups:Soups`;
        case ProductCategory.SecondCourses:
          return $localize`:@@secondCourses:Second courses`;
        case ProductCategory.Salads:
          return $localize`:@@salads:Salads`;
        case ProductCategory.Snacks:
          return $localize`:@@snacks:Snacks`;
        case ProductCategory.Drinks:
          return $localize`:@@drinks:Drinks`;
        case ProductCategory.Desserts:
          return $localize`:@@desserts:Desserts`;
        default:
          throw new Error('Unknown product category');
      }
    })();
  }
}
