import '@angular/localize/init';

import { ProductCategory } from '../../../models/product/product-category.enum';
import { ProductCategoryLabelPipe } from './product-category-label.pipe';

describe('ProductCategoryLabelPipe', () => {
  let pipe: ProductCategoryLabelPipe;

  beforeEach(() => {
    pipe = new ProductCategoryLabelPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return appropriate unit of weight representations', () => {
    expect(pipe.transform(ProductCategory.Soups)).toBe('Soups');
    expect(pipe.transform(ProductCategory.SecondCourses)).toBe(
      'Second courses'
    );
    expect(pipe.transform(ProductCategory.Salads)).toBe('Salads');
    expect(pipe.transform(ProductCategory.Snacks)).toBe('Snacks');
    expect(pipe.transform(ProductCategory.Drinks)).toBe('Drinks');
    expect(pipe.transform(ProductCategory.Desserts)).toBe('Desserts');
  });
});
