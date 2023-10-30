import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectMobileMode, selectShowSideMenu } from '../state/ui.selectors';
import { UiActions } from '../state/ui.actions';

@Injectable({
  providedIn: 'root',
})
export class UiFacade {
  public constructor(private store: Store) {}

  public getMobileMode$(): Observable<boolean> {
    return this.store.select(selectMobileMode);
  }

  public getShowSideMenu$(): Observable<boolean> {
    return this.store.select(selectShowSideMenu);
  }

  public toggleMobileMode(mobileMode?: boolean): void {
    this.store.dispatch(
      UiActions.toggleMobileMode(
        mobileMode !== undefined ? { mobileMode } : undefined
      )
    );
  }

  public toggleSideMenu(showSideMenu?: boolean): void {
    this.store.dispatch(
      UiActions.toggleSideMenu(
        showSideMenu !== undefined ? { showSideMenu } : undefined
      )
    );
  }
}
