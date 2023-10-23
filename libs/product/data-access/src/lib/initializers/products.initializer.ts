import { Store } from '@ngrx/store';
import { APP_INITIALIZER, InjectionToken, Provider } from '@angular/core';

import { ProductsActions } from '../state/products.actions';

// Fetch products on app startup
export const initializeProductsFactory = (store: Store) => (): void => {
  store.dispatch(ProductsActions.fetchProducts());
};

export const provideProductsInitializer = (
  token: InjectionToken<any> = APP_INITIALIZER
): Provider => ({
  provide: token,
  multi: true,
  useFactory: initializeProductsFactory,
  deps: [Store],
});
