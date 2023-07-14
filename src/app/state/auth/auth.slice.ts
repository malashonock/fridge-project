import { createFeature, createReducer } from '@ngrx/store';

import { User } from 'app/core/models/user/user.model';

export type AuthSessionState =
  | {
      user: User;
      token: string;
      expiresAt: Date;
    }
  | undefined;

const initialState: AuthSessionState = undefined;

export const authSlice = createFeature({
  name: 'auth',
  reducer: createReducer(initialState),
});
