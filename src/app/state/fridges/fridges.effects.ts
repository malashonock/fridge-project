import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { FridgeService } from 'core/services/fridge/fridge.service';
import { FridgesActions } from './fridges.actions';
import { Fridge } from 'core/models/fridge/fridge.interface';

@Injectable()
export class FridgesEffects {
  public constructor(
    private actions$: Actions,
    private fridgeService: FridgeService
  ) {}

  public fetchFridges$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FridgesActions.fetchFridges),
      switchMap(() => {
        return this.fridgeService.getFridges().pipe(
          map((fridges: Fridge[]) => {
            return FridgesActions.fetchFridgesSuccess({ fridges });
          }),
          catchError((error) => {
            return of(
              FridgesActions.fetchFridgesFailure({ error: error.message })
            );
          })
        );
      })
    );
  });
}
