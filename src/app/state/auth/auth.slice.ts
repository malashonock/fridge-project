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

const initialState: AuthSessionState = undefined;

export const authSlice = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState as AuthSessionState,
    on(AuthActions.loginSuccess, AuthActionReducers.loginSuccessReducer),
    on(AuthActions.loginFailure, AuthActionReducers.loginFailureReducer),
    on(AuthActions.logout, AuthActionReducers.logoutReducer)
  ),
});
