import { NgModule, Provider } from '@angular/core';

import { nutrientsProvider } from './configs/nutrient.config';
import { periodsProvider } from './configs/periods.config';
import { productCategoriesProvider } from './configs/product-categories.config';
import { userRolesProvider } from './configs/user-roles.config';
import { weightUnitsProvider } from './configs/weight-units.config';
import { AuthSessionInitializer } from './app-initializer/auth-session.initializer';
import { FridgesInitializer } from './app-initializer/fridges.initializer';
import { LeafletInitializer } from './app-initializer/leaflet.initializer';
import { ProductsInitializer } from './app-initializer/products.initializer';

const configProviders: Provider[] = [
  productCategoriesProvider,
  userRolesProvider,
  weightUnitsProvider,
  nutrientsProvider,
  periodsProvider,
];

const appInitializers: Provider[] = [
  AuthSessionInitializer,
  ProductsInitializer,
  FridgesInitializer,
  LeafletInitializer,
];

@NgModule({
  providers: [configProviders, appInitializers],
})
export class InitializersModule {}
