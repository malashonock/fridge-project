import {
  APP_INITIALIZER,
  InjectionToken,
  Provider,
  inject,
} from '@angular/core';

import { ProductFacade } from '../facade/product.facade';

// Fetch products on app startup
export const initializeProductsFactory = (): void => {
  const productFacade = inject(ProductFacade);
  productFacade.loadProducts();
};

export const provideProductsInitializer = (
  token: InjectionToken<any> = APP_INITIALIZER
): Provider => ({
  provide: token,
  multi: true,
  useFactory: initializeProductsFactory,
  deps: [ProductFacade],
});
