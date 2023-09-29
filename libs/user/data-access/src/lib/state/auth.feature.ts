import { createFeature, createReducer, on } from '@ngrx/store';

import { AuthSessionState } from 'user-domain';

import { AuthActions } from './auth.actions';
import { AuthActionReducers } from './auth.reducers';

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
