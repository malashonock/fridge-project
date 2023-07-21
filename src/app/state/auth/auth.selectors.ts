import { createSelector } from '@ngrx/store';
import { AuthSessionState, authFeature } from './auth.feature';

export const { selectAuthState } = authFeature;

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
