import { createFeature, createReducer, on } from '@ngrx/store';

import { User } from 'app/core/models/user/user.model';
import { AuthActions } from './auth.actions';
import { AuthActionReducers } from './auth.reducers';

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: Date;
}

export type AuthSessionState = AuthSession | undefined;

export const initialState: AuthSessionState = undefined;

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState as AuthSessionState,
    on(AuthActions.loginSuccess, AuthActionReducers.loginSuccessReducer),
    on(AuthActions.loginFailure, AuthActionReducers.loginFailureReducer),
    on(AuthActions.logoutSuccess, AuthActionReducers.logoutSuccessReducer),
    on(AuthActions.logoutFailure, AuthActionReducers.logoutFailureReducer)
  ),
});
