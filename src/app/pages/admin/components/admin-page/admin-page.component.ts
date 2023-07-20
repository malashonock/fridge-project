import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';

import { MenuItemConfig } from 'app/shared/components/menu-item/menu-item.component';

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

  compactWidthMode = false;
  showSideMenu = true;

  destroySubs$ = new Subject();

  @ViewChild('sideMenu') sideMenu?: MatSidenav;

  constructor(private breakpointObserver: BreakpointObserver) {}

  get sideMenuMode(): MatDrawerMode {
    return this.compactWidthMode ? 'over' : 'side';
  }

  ngAfterViewInit(): void {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.TabletPortrait,
        Breakpoints.HandsetPortrait,
      ])
      .pipe(takeUntil(this.destroySubs$))
      .subscribe(this.handleBreakpointChange.bind(this));
  }

  ngOnDestroy(): void {
    this.destroySubs$.next(null);
    this.destroySubs$.complete();
  }

  handleBreakpointChange(state: BreakpointState): void {
    if (state.matches) {
      this.compactWidthMode = true;
      this.showSideMenu = false;
    } else {
      this.compactWidthMode = false;
      this.showSideMenu = true;
    }
  }

  getMenuItemKey(index: number, menuItemConfig: MenuItemConfig): string {
    return menuItemConfig.text;
  }
}
