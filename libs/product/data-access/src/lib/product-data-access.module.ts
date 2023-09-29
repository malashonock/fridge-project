import { NgModule, Provider } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ProductRepository } from './repository/product.repository';
import { productCategoriesProvider } from './configs/product-categories.config';
import { weightUnitsProvider } from './configs/weight-units.config';
import { nutrientsProvider } from './configs/nutrient.config';
import { periodsProvider } from './configs/periods.config';
import { ProductsInitializer } from './initializers/products.initializer';
import { productsFeature } from './state/products.feature';
import { ProductsEffects } from './state/products.effects';

const configProviders: Provider[] = [
  productCategoriesProvider,
  weightUnitsProvider,
  nutrientsProvider,
  periodsProvider,
];

@NgModule({
  providers: [ProductRepository, configProviders, ProductsInitializer],
  imports: [
    StoreModule.forFeature(productsFeature.name, productsFeature.reducer),
    EffectsModule.forFeature([ProductsEffects]),
  ],
})
export class ProductDataAccessModule {}
