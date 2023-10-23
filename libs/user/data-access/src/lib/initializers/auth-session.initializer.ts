import { Store } from '@ngrx/store';
import { APP_INITIALIZER, InjectionToken, Provider } from '@angular/core';

import { AuthActions } from '../state/auth.actions';
import { AuthService } from '../services/auth.service';

// Restore session data from local storage on app startup
export const initializeAuthSessionFactory =
  (authService: AuthService, store: Store) => (): void => {
    const sessionData = authService.restoreSession();
    store.dispatch(
      sessionData
        ? AuthActions.loginSuccess({ sessionData })
        : AuthActions.logoutSuccess()
    );
  };

export const provideAuthSessionInitializer = (
  token: InjectionToken<any> = APP_INITIALIZER
): Provider => ({
  provide: APP_INITIALIZER,
  multi: true,
  useFactory: initializeAuthSessionFactory,
  deps: [AuthService, Store],
});
