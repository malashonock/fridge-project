import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { LoginCredentials } from 'core/models/auth/login.interface';
import { SignupCredentials } from 'core/models/auth/signup.interface';
import { User } from 'core/models/user/user.interface';
import { AuthSession } from './auth.feature';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Signup: props<{ credentials: SignupCredentials }>(),
    'Signup Success': props<{ user: User; password: string }>(),
    'Signup Failure': props<{ error: string }>(),
    Login: props<{ credentials: LoginCredentials }>(),
    'Login Success': props<{ sessionData: AuthSession }>(),
    'Login Failure': props<{ error: string }>(),
    Logout: emptyProps(),
    'Logout Success': emptyProps(),
    'Logout Failure': props<{ error: string }>(),
  },
});
