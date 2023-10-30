import { NgModule, Provider } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ProductRepository } from './repository/product.repository';
import { provideProductCategories } from './configs/product-categories.config';
import { provideWeightUnits } from './configs/weight-units.config';
import { provideNutrients } from './configs/nutrient.config';
import { providePeriods } from './configs/periods.config';
import { initializeProductsFactory } from './initializers/products.initializer';
import { productsFeature } from './state/products.feature';
import { ProductsEffects } from './state/products.effects';
import { ProductFacade } from './facade/product.facade';

const provideConfigs = (): Provider[] => [
  provideProductCategories(),
  provideWeightUnits(),
  provideNutrients(),
  providePeriods(),
];

@NgModule({
  providers: [ProductRepository, ProductFacade, provideConfigs()],
  imports: [
    StoreModule.forFeature(productsFeature.name, productsFeature.reducer),
    EffectsModule.forFeature([ProductsEffects]),
  ],
})
export class ProductDataAccessModule {
  public constructor() {
    initializeProductsFactory();
  }
}
