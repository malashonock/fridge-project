import { OnReducer } from '@ngrx/store/src/reducer_creator';

import { AuthSessionState } from './auth.slice';
import { AuthActions } from './auth.actions';

const loginSuccessReducer: OnReducer<
  AuthSessionState,
  [typeof AuthActions.loginSuccess]
> = (_, { sessionData }) => sessionData;

const loginFailureReducer: OnReducer<
  AuthSessionState,
  [typeof AuthActions.loginFailure]
> = () => undefined;

const logoutReducer: OnReducer<
  AuthSessionState,
  [typeof AuthActions.logout]
> = () => undefined;

export const AuthActionReducers = {
  loginSuccessReducer,
  loginFailureReducer,
  logoutReducer,
};
