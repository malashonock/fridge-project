import { Injectable, Optional } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { Fridge } from 'fridge-domain';
import { WithId } from 'shared-data-access';

import { FridgeRepository } from '../repository/fridge.repository';
import { FridgesActions } from './fridges.actions';
import { UiFacade } from 'private-shared-data-access';

@Injectable()
export class FridgesEffects {
  public constructor(
    private actions$: Actions,
    private fridgeRepository: FridgeRepository,
    @Optional() private uiFacade: UiFacade
  ) {}

  public fetchFridges$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FridgesActions.fetchFridges),
      tap(() => this.uiFacade?.startLoading()),
      switchMap(() => {
        return this.fridgeRepository.getFridges().pipe(
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

  public fetchProductsFinish$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          FridgesActions.fetchFridgesSuccess,
          FridgesActions.fetchFridgesFailure
        ),
        tap(() => this.uiFacade?.finishLoading())
      );
    },
    { dispatch: false }
  );

  public createFridge$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FridgesActions.createFridge),
      switchMap(
        ({ fridgeData }: ReturnType<typeof FridgesActions.createFridge>) => {
          return this.fridgeRepository.createFridge(fridgeData).pipe(
            map((fridge: Fridge) => {
              return FridgesActions.createFridgeSuccess({ fridge });
            }),
            catchError((error) => {
              return of(
                FridgesActions.createFridgeFailure({ error: error.message })
              );
            })
          );
        }
      )
    );
  });

  public updateFridge$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FridgesActions.updateFridge),
      switchMap(
        ({
          id,
          fridgeData,
        }: ReturnType<typeof FridgesActions.updateFridge>) => {
          return this.fridgeRepository.updateFridge(id, fridgeData).pipe(
            map((fridge: Fridge) => {
              return FridgesActions.updateFridgeSuccess({ fridge });
            }),
            catchError((error) => {
              return of(
                FridgesActions.updateFridgeFailure({
                  id,
                  error: error.message,
                })
              );
            })
          );
        }
      )
    );
  });

  public deleteFridge$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FridgesActions.deleteFridge),
      switchMap(({ id }: ReturnType<typeof FridgesActions.deleteFridge>) => {
        return this.fridgeRepository.deleteFridge(id).pipe(
          map(({ id }: WithId) => {
            return FridgesActions.deleteFridgeSuccess({ id });
          }),
          catchError((error) => {
            return of(
              FridgesActions.deleteFridgeFailure({ id, error: error.message })
            );
          })
        );
      })
    );
  });

  public submitCreateFridge$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FridgesActions.createFridge),
      map(() => {
        return FridgesActions.submit({ id: null });
      })
    );
  });

  public submitUpdateFridge$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FridgesActions.updateFridge),
      map(({ id }: ReturnType<typeof FridgesActions.updateFridge>) => {
        return FridgesActions.submit({ id });
      })
    );
  });

  public submitDeleteFridge$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FridgesActions.deleteFridge),
      map(({ id }: ReturnType<typeof FridgesActions.deleteFridge>) => {
        return FridgesActions.submit({ id });
      })
    );
  });

  public submitCreateFridgeSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FridgesActions.createFridgeSuccess),
      map(() => {
        return FridgesActions.submitSuccess({ id: null });
      })
    );
  });

  public submitUpdateFridgeSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FridgesActions.updateFridgeSuccess),
      map(
        ({ fridge }: ReturnType<typeof FridgesActions.updateFridgeSuccess>) => {
          return FridgesActions.submitSuccess({ id: fridge.id });
        }
      )
    );
  });

  public submitDeleteFridgeSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FridgesActions.deleteFridgeSuccess),
      map(({ id }: ReturnType<typeof FridgesActions.deleteFridgeSuccess>) => {
        return FridgesActions.submitSuccess({ id });
      })
    );
  });

  public submitCreateFridgeFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FridgesActions.createFridgeFailure),
      map(({ error }) => {
        return FridgesActions.submitFailure({ id: null, error });
      })
    );
  });

  public submitUpdateFridgeFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FridgesActions.updateFridgeFailure),
      map(({ id, error }) => {
        return FridgesActions.submitFailure({ id, error });
      })
    );
  });

  public submitDeleteFridgeFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FridgesActions.deleteFridgeFailure),
      map(({ id, error }) => {
        return FridgesActions.submitFailure({ id, error });
      })
    );
  });
}
