import { createSelector } from '@ngrx/store';
import { AuthSessionState, authSlice } from './auth.slice';

export const { selectAuthState } = authSlice;

export const selectLoggedUser = createSelector(
  selectAuthState,
  (authState: AuthSessionState) => authState?.user
);

export const selectAuthToken = createSelector(
  selectAuthState,
  (authState: AuthSessionState) => authState?.token
);

export const selectSessionExpirationTime = createSelector(
  selectAuthState,
  (authState: AuthSessionState) => authState?.expiresAt
);
