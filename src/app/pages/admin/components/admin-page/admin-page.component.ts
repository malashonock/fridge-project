import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';

import { MenuItemConfig } from 'app/shared/components/menu-item/menu-item.component';
import {
  selectMobileMode,
  selectShowSideMenu,
} from 'app/state/ui/ui.selectors';
import { UiActions } from 'app/state/ui/ui.actions';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements AfterViewInit, OnDestroy {
  menuConfig: MenuItemConfig[] = [
    { text: 'Products', href: 'products', matIconCode: 'fastfood' },
    { text: 'Fridges', href: 'fridges', matIconCode: 'kitchen' },
    { text: 'Map', href: 'map', matIconCode: 'map' },
  ];

  mobileMode$: Observable<boolean>;
  showSideMenu$: Observable<boolean>;
  sideMenuMode$: Observable<MatDrawerMode>;

  destroy$ = new Subject();

  @ViewChild('sideMenu') sideMenu?: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    private viewRef: ChangeDetectorRef
  ) {
    this.mobileMode$ = this.store.select(selectMobileMode);
    this.showSideMenu$ = this.store.select(selectShowSideMenu);
    this.sideMenuMode$ = this.mobileMode$.pipe(
      map(this.getSideMenuMode.bind(this))
    );
  }

  ngAfterViewInit(): void {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.TabletPortrait,
        Breakpoints.HandsetPortrait,
      ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.handleBreakpointChange.bind(this));
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  toggleSideMenu(showSideMenu: boolean) {
    this.store.dispatch(UiActions.toggleSideMenu({ showSideMenu }));
  }

  handleBreakpointChange(state: BreakpointState): void {
    this.store.dispatch(
      UiActions.toggleMobileMode({ mobileMode: state.matches })
    );
    // Need to trigger CD manually to avoid ExpressionChangedAfterItHasBeenCheckedError
    this.viewRef.detectChanges();
  }

  getMenuItemKey(index: number, menuItemConfig: MenuItemConfig): string {
    return menuItemConfig.text;
  }

  getSideMenuMode(mobileMode: boolean): MatDrawerMode {
    return mobileMode ? 'over' : 'side';
  }
}
