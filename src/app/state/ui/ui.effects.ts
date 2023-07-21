import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, withLatestFrom } from 'rxjs';

import { UiActions } from './ui.actions';
import { Store } from '@ngrx/store';
import { selectMobileMode } from './ui.selectors';

@Injectable()
export class UiEffects {
  constructor(private actions$: Actions, private store: Store) {}

  toggleMobileMode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UiActions.toggleMobileMode),
      withLatestFrom(this.store.select(selectMobileMode)),
      map(([mobileMode]) =>
        /* On mobile mode enter, close mobile menu, and vice versa */
        UiActions.toggleSideMenu({ showSideMenu: mobileMode ? false : true })
      )
    )
  );
}
