import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { AuthService } from 'app/core/services/auth/auth.service';
import { AuthActions } from './auth.actions';
import { User } from 'app/core/models/user/user.model';
import { AuthSession } from './auth.feature';
import { UserRole } from 'app/core/models/user/user-role.model';

@Injectable()
export class AuthEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

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

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(
          /* Redirect depending on user role */
          ({ sessionData }: ReturnType<typeof AuthActions.loginSuccess>) => {
            const { user } = sessionData;
            const redirectTo = user.role === UserRole.Admin ? '/admin' : 'user';
            this.router.navigateByUrl(redirectTo);
          }
        )
      ),
    { dispatch: false }
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

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => this.router.navigateByUrl('/auth/login'))
      ),
    { dispatch: false }
  );
}
