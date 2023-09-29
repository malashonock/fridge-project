import { Store } from '@ngrx/store';
import { APP_INITIALIZER, Provider } from '@angular/core';

import { ProductsActions } from '../state/products.actions';

// Fetch products on app startup
export const initializeProductsFactory = (store: Store) => (): void => {
  store.dispatch(ProductsActions.fetchProducts());
};

export const ProductsInitializer: Provider = {
  provide: APP_INITIALIZER,
  multi: true,
  useFactory: initializeProductsFactory,
  deps: [Store],
};
