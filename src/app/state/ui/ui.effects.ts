import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';

import { UiActions } from './ui.actions';

@Injectable()
export class UiEffects {
  constructor(private actions$: Actions) {}

  toggleMobileMode$ = createEffect(() =>
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
}
