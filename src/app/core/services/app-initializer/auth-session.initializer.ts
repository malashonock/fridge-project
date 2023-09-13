import { Store } from '@ngrx/store';
import { APP_INITIALIZER, Provider } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { AuthActions } from 'store/auth/auth.actions';

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

export const AuthSessionInitializer: Provider = {
  provide: APP_INITIALIZER,
  multi: true,
  useFactory: initializeAuthSessionFactory,
  deps: [AuthService, Store],
};
