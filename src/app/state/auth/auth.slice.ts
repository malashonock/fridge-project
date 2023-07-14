import { createFeature, createReducer } from '@ngrx/store';
import { UserRole } from 'app/core/models/user/user-role.model';

export type AuthSessionState =
  | {
      user: {
        id: string;
        name: string;
        role: UserRole;
      };
      token: string;
      expiresAt: Date;
    }
  | undefined;

const initialState: AuthSessionState = undefined;

export const authSlice = createFeature({
  name: 'auth',
  reducer: createReducer(initialState),
});
