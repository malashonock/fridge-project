import { Component, ViewChild } from '@angular/core';
import {} from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';

import { MenuItemConfig } from 'app/shared/components/menu-item/menu-item.component';
import {
  selectMobileMode,
  selectShowSideMenu,
} from 'app/state/ui/ui.selectors';
import { UiActions } from 'app/state/ui/ui.actions';
import { MobilePageDirective } from 'app/shared/directives/mobile/page/mobile-page.directive';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  hostDirectives: [MobilePageDirective],
})
export class AdminPageComponent {
  menuConfig: MenuItemConfig[] = [
    { text: 'Products', href: 'products', matIconCode: 'fastfood' },
    { text: 'Fridges', href: 'fridges', matIconCode: 'kitchen' },
    { text: 'Map', href: 'map', matIconCode: 'map' },
  ];

  mobileMode$: Observable<boolean>;
  showSideMenu$: Observable<boolean>;
  sideMenuMode$: Observable<MatDrawerMode>;

  @ViewChild('sideMenu') sideMenu?: MatSidenav;

  constructor(private store: Store) {
    this.mobileMode$ = this.store.select(selectMobileMode);
    this.showSideMenu$ = this.store.select(selectShowSideMenu);
    this.sideMenuMode$ = this.mobileMode$.pipe(
      map(this.getSideMenuMode.bind(this))
    );
  }

  toggleSideMenu(showSideMenu: boolean) {
    this.store.dispatch(UiActions.toggleSideMenu({ showSideMenu }));
  }

  getMenuItemKey(index: number, menuItemConfig: MenuItemConfig): string {
    return menuItemConfig.text;
  }

  getSideMenuMode(mobileMode: boolean): MatDrawerMode {
    return mobileMode ? 'over' : 'side';
  }
}
