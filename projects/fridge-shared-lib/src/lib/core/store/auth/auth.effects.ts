import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { AuthService } from '@shared/core/services/auth/auth.service';
import { User } from '@shared/models/user/user.interface';
import { UserRole } from '@shared/models/user/user-role.enum';
import { AuthActions } from './auth.actions';
import { AuthSession } from './auth.feature';

@Injectable()
export class AuthEffects {
  public constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  public signup$ = createEffect(() =>
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

  public signupSuccess$ = createEffect(() =>
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

  public login$ = createEffect(() =>
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

  public loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(
          /* Redirect depending on user role */
          ({ sessionData }: ReturnType<typeof AuthActions.loginSuccess>) => {
            const { user } = sessionData;
            const redirectTo =
              user.role === UserRole.Admin ? '/admin' : '/user';
            // If the user has simply reloaded a protected page, try keeping the current url
            // NB! router.url returns "/" -> location.pathname was used
            const currentUrl: string = window.location.pathname;
            this.router.navigateByUrl(
              currentUrl.startsWith(redirectTo) ? currentUrl : redirectTo
            );
          }
        )
      ),
    { dispatch: false }
  );

  public logout$ = createEffect(() =>
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

  public logoutFinish$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess, AuthActions.logoutFailure),
        tap(() => this.router.navigateByUrl('/auth/login'))
      ),
    { dispatch: false }
  );
}
