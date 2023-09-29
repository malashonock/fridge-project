import { OnReducer } from '@ngrx/store/src/reducer_creator';

import { AuthSessionState } from 'user-domain';

import { AuthActions } from './auth.actions';

const loginSuccessReducer: OnReducer<
  AuthSessionState,
  [typeof AuthActions.loginSuccess]
> = (_, { sessionData }) => sessionData;

const loginFailureReducer: OnReducer<
  AuthSessionState,
  [typeof AuthActions.loginFailure]
> = () => undefined;

const logoutSuccessReducer: OnReducer<
  AuthSessionState,
  [typeof AuthActions.logoutSuccess]
> = () => undefined;

const logoutFailureReducer: OnReducer<
  AuthSessionState,
  [typeof AuthActions.logoutFailure]
> = () => undefined;

export const AuthActionReducers = {
  loginSuccessReducer,
  loginFailureReducer,
  logoutSuccessReducer,
  logoutFailureReducer,
};
