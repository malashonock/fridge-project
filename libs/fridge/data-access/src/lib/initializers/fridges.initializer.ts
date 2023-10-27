import {
  APP_INITIALIZER,
  InjectionToken,
  Provider,
  inject,
} from '@angular/core';

import { FridgeFacade } from '../facade/fridge.facade';

// Fetch fridges on app startup
export const initializeFridgesFactory = (): void => {
  const fridgeFacade = inject(FridgeFacade);
  fridgeFacade.loadFridges();
};

export const provideFridgesInitializer = (
  token: InjectionToken<any> = APP_INITIALIZER
): Provider => ({
  provide: token,
  multi: true,
  useFactory: initializeFridgesFactory,
  deps: [FridgeFacade],
});
