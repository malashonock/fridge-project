import { Directive, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';

import { UiFacade } from 'private-shared-data-access';

@Directive({
  selector: '[libMobileMenu]',
})
export class MobileMenuDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  public constructor(private host: MatSidenav, private uiFacade: UiFacade) {}

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
    this.uiFacade
      .getMobileMode$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((mobileMode: boolean) => {
        this.host.disableClose = !mobileMode;
        this.host.mode = mobileMode ? 'over' : 'side';
      });
  }

  private subscribeToStoreShowSideMenu(): void {
    this.uiFacade
      .getShowSideMenu$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((showSideMenu: boolean) => {
        this.host.opened = showSideMenu;
      });
  }

  private subscribeToHostOpenedChange(): void {
    this.host.openedChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((showSideMenu: boolean) => {
        this.uiFacade.toggleSideMenu(showSideMenu);
      });
  }
}
