import { NgModule } from '@angular/core';

import { NutrientLabelPipe } from './pipes/nutrient-label/nutrient-label.pipe';
import { PeriodLabelPipe } from './pipes/period-label/period-label.pipe';
import { ProductCategoryLabelPipe } from './pipes/product-category-label/product-category-label.pipe';
import { ShelfLifeLabelPipe } from './pipes/shelf-life-label/shelf-life-label.pipe';
import { WeightUnitLabelPipe } from './pipes/weight-unit-label/weight-unit-label.pipe';

const pipes = [
  NutrientLabelPipe,
  PeriodLabelPipe,
  ProductCategoryLabelPipe,
  ShelfLifeLabelPipe,
  WeightUnitLabelPipe,
];

@NgModule({
  imports: [pipes],
  exports: [pipes],
})
export class ProductUiModule {}
