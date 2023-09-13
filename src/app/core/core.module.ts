import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { productCategoriesProvider } from './configs/product-categories.config';
import { userRolesProvider } from './configs/user-roles.config';
import { weightUnitsProvider } from './configs/weight-units.config';
import { nutrientsProvider } from './configs/nutrient.config';
import { periodsProvider } from './configs/periods.config';
import { AuthSessionInitializer } from './services/app-initializer/auth-session.initializer';
import { FridgesInitializer } from './services/app-initializer/fridges.initializer';
import { LeafletInitializer } from './services/app-initializer/leaflet.initializer';
import { ProductsInitializer } from './services/app-initializer/products.initializer';
import { httpInterceptorProviders } from './interceptors';

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
  declarations: [],
  imports: [],
  exports: [BrowserModule, BrowserAnimationsModule, HttpClientModule],
  providers: [configProviders, appInitializers, httpInterceptorProviders],
})
export class CoreModule {}
