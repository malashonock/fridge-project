import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';

import { FridgesActions } from 'fridge-data-access';
import { NotificationService } from '../services/notification/notification.service';
import { NotificationSeverity } from '../types/notification-severity.enum';

@Injectable()
export class FridgesNotificationEffects {
  public constructor(
    private actions$: Actions,
    private notificationService: NotificationService
  ) {}

  public fetchFridgesFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(FridgesActions.fetchFridgesFailure),
        tap(() => {
          this.notificationService.broadcastMessage(
            'Failed to fetch fridges data',
            NotificationSeverity.Error
          );
        })
      );
    },
    { dispatch: false }
  );

  public createFridgeSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(FridgesActions.createFridgeSuccess),
        tap(() => {
          this.notificationService.broadcastMessage(
            'New fridge created successfully',
            NotificationSeverity.Success
          );
        })
      );
    },
    { dispatch: false }
  );

  public createFridgeFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(FridgesActions.createFridgeFailure),
        tap(() => {
          this.notificationService.broadcastMessage(
            'Failed to create a new fridge',
            NotificationSeverity.Error
          );
        })
      );
    },
    { dispatch: false }
  );

  public updateFridgeSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(FridgesActions.updateFridgeSuccess),
        tap(() => {
          this.notificationService.broadcastMessage(
            'Fridge data updated successfully',
            NotificationSeverity.Success
          );
        })
      );
    },
    { dispatch: false }
  );

  public updateFridgeFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(FridgesActions.updateFridgeFailure),
        tap(() => {
          this.notificationService.broadcastMessage(
            'Failed to update the fridge data',
            NotificationSeverity.Error
          );
        })
      );
    },
    { dispatch: false }
  );

  public deleteFridgeSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(FridgesActions.deleteFridgeSuccess),
        tap(() => {
          this.notificationService.broadcastMessage(
            'Fridge deleted successfully',
            NotificationSeverity.Success
          );
        })
      );
    },
    { dispatch: false }
  );

  public deleteFridgeFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(FridgesActions.deleteFridgeFailure),
        tap(() => {
          this.notificationService.broadcastMessage(
            'Failed to delete the fridge',
            NotificationSeverity.Error
          );
        })
      );
    },
    { dispatch: false }
  );
}
