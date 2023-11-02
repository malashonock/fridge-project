import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';

import { AuthActions } from 'user-data-access';
import { NotificationService } from '../services/notification/notification.service';
import { NotificationSeverity } from '../types/notification-severity.enum';

@Injectable()
export class AuthNotificationEffects {
  public constructor(
    private actions$: Actions,
    private notificationService: NotificationService
  ) {}

  public signupSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.signupSuccess),
        tap(({ user }) => {
          this.notificationService.broadcastMessage(
            `New user ${user.name} registered successfully`,
            NotificationSeverity.Success
          );
        })
      );
    },
    { dispatch: false }
  );

  public signupFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.signupFailure),
        tap(() => {
          this.notificationService.broadcastMessage(
            'Failed to register a new user',
            NotificationSeverity.Error
          );
        })
      );
    },
    { dispatch: false }
  );

  public loginSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ sessionData }) => {
          const { user } = sessionData;
          this.notificationService.broadcastMessage(
            `User ${user.name} logged in successfully`,
            NotificationSeverity.Success
          );
        })
      );
    },
    { dispatch: false }
  );

  public loginFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(() => {
          this.notificationService.broadcastMessage(
            'Login attempt failed',
            NotificationSeverity.Error
          );
        })
      );
    },
    { dispatch: false }
  );

  public logoutSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => {
          this.notificationService.broadcastMessage(
            'User logged out successfully',
            NotificationSeverity.Success
          );
        })
      );
    },
    { dispatch: false }
  );

  public logoutFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logoutFailure),
        tap(() => {
          this.notificationService.broadcastMessage(
            'Logout attempt failed',
            NotificationSeverity.Error
          );
        })
      );
    },
    { dispatch: false }
  );
}
