import { Store } from '@ngrx/store';
import { APP_INITIALIZER, InjectionToken, Provider } from '@angular/core';

import { FridgesActions } from '../state/fridges.actions';

// Fetch fridges on app startup
export const initializeFridgesFactory = (store: Store) => (): void => {
  store.dispatch(FridgesActions.fetchFridges());
};

export const provideFridgesInitializer = (
  token: InjectionToken<any> = APP_INITIALIZER
): Provider => ({
  provide: token,
  multi: true,
  useFactory: initializeFridgesFactory,
  deps: [Store],
});
