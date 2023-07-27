import { Store } from '@ngrx/store';
import { APP_INITIALIZER, Provider } from '@angular/core';

import { ProductsActions } from 'app/state/products';

// Fetch products on app startup
const initializeProductsFactory = (store: Store) => (): void => {
  store.dispatch(ProductsActions.fetchProducts());
};

export const ProductsInitializer: Provider = {
  provide: APP_INITIALIZER,
  multi: true,
  useFactory: initializeProductsFactory,
  deps: [Store],
};