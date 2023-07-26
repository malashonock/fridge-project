import { Directive, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  selectMobileMode,
  selectShowSideMenu,
} from 'app/state/ui/ui.selectors';
import { UiActions } from 'app/state/ui/ui.actions';

@Directive({
  selector: '[appMobileMenu]',
})
export class MobileMenuDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  public constructor(private host: MatSidenav, private store: Store) {}

  public ngOnInit(): void {
    this.subscribeToStoreMobileMode();
    this.subscribeToStoreShowSideMenu();
    this.subscribeToHostOpenedChange();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private subscribeToStoreMobileMode(): void {
    this.store
      .select(selectMobileMode)
      .pipe(takeUntil(this.destroy$))
      .subscribe((mobileMode: boolean) => {
        this.host.disableClose = !mobileMode;
        this.host.mode = mobileMode ? 'over' : 'side';
      });
  }

  private subscribeToStoreShowSideMenu(): void {
    this.store
      .select(selectShowSideMenu)
      .pipe(takeUntil(this.destroy$))
      .subscribe((showSideMenu: boolean) => {
        this.host.opened = showSideMenu;
      });
  }

  private subscribeToHostOpenedChange(): void {
    this.host.openedChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((showSideMenu: boolean) => {
        this.store.dispatch(UiActions.toggleSideMenu({ showSideMenu }));
      });
  }
}
