import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { LoginCredentials } from 'app/core/models/auth/login.model';
import { AuthSessionState } from './auth.slice';
import { SignupCredentials } from 'app/core/models/auth/signup.model';
import { User } from 'app/core/models/user/user.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Signup: props<{ credentials: SignupCredentials }>(),
    'Signup Success': props<{ createdUser: User }>(),
    'Signup Failure': props<{ error: string }>(),
    Login: props<{ credentials: LoginCredentials }>(),
    'Login Success': props<{ sessionData: AuthSessionState }>(),
    'Login Failure': props<{ error: string }>(),
    Logout: emptyProps(),
  },
});
