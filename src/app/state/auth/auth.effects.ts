import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { AuthService } from 'app/core/services/auth/auth.service';
import { AuthActions } from './auth.actions';
import { User } from 'app/core/models/user/user.model';
import { AuthSession } from './auth.slice';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      switchMap(({ credentials }: ReturnType<typeof AuthActions.signup>) =>
        this.authService.signup(credentials).pipe(
          map((user: User) =>
            AuthActions.signupSuccess({ user, password: credentials.password })
          ),
          catchError((error) =>
            of(AuthActions.signupFailure({ error: error.message }))
          )
        )
      )
    )
  );

  signupSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupSuccess),
      switchMap(
        ({ user, password }: ReturnType<typeof AuthActions.signupSuccess>) =>
          /* After successful registration, login automatically */
          of(
            AuthActions.login({
              credentials: {
                userName: user.name,
                password,
              },
            })
          )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ credentials }: ReturnType<typeof AuthActions.login>) =>
        this.authService.login(credentials).pipe(
          map((sessionData: AuthSession) =>
            AuthActions.loginSuccess({ sessionData })
          ),
          catchError((error) =>
            of(AuthActions.loginFailure({ error: error.message }))
          )
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError((error) =>
            of(AuthActions.logoutFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
