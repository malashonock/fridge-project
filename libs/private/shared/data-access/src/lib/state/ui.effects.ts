import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';

import { FridgesActions } from 'fridge-data-access';
import { ProductsActions } from 'product-data-access';

import { UiActions } from './ui.actions';

@Injectable()
export class UiEffects {
  public constructor(private actions$: Actions) {}

  public toggleMobileMode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UiActions.toggleMobileMode),
      map(({ mobileMode }) => {
        /* On mobile mode enter, close mobile menu, and vice versa */
        return UiActions.toggleSideMenu({
          showSideMenu: mobileMode ? false : true,
        });
      })
    )
  );

  public loadingStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FridgesActions.fetchFridges, ProductsActions.fetchProducts),
      map(() => {
        return UiActions.startLoading();
      })
    );
  });

  public loadingFinish$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        FridgesActions.fetchFridgesSuccess,
        FridgesActions.fetchFridgesFailure,
        ProductsActions.fetchProductsSuccess,
        ProductsActions.fetchProductsFailure
      ),
      map(() => {
        return UiActions.finishLoading();
      })
    );
  });
}
