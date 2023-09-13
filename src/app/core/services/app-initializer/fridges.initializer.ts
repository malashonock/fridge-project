import { Store } from '@ngrx/store';
import { APP_INITIALIZER, Provider } from '@angular/core';

import { FridgesActions } from 'store/fridges/fridges.actions';

// Fetch fridges on app startup
export const initializeFridgesFactory = (store: Store) => (): void => {
  store.dispatch(FridgesActions.fetchFridges());
};

export const FridgesInitializer: Provider = {
  provide: APP_INITIALIZER,
  multi: true,
  useFactory: initializeFridgesFactory,
  deps: [Store],
};
