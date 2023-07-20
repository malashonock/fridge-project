import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';

import { UiActions } from './ui.actions';

@Injectable()
export class UiEffects {
  constructor(private actions$: Actions) {}

  enterMobileMode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UiActions.enterMobileMode),
      map(() => UiActions.closeSideMenu())
    )
  );

  leaveMobileMode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UiActions.enterMobileMode),
      map(() => UiActions.openSideMenu())
    )
  );
}
