import { createActionGroup, emptyProps, props } from '@ngrx/store';

import {
  User,
  LoginCredentials,
  SignupCredentials,
  AuthSession,
} from 'user-domain';

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
