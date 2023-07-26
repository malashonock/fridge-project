import { Component, Inject } from '@angular/core';

import { MenuItemConfig } from 'app/shared/components/menu-item/menu-item.component';
import { ADMIN_PAGE_MENU_CONFIG } from 'app/core/configs/admin-page-menu.config';
import { MobilePageDirective } from 'app/shared/directives/mobile/page/mobile-page.directive';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  hostDirectives: [MobilePageDirective],
})
export class AdminPageComponent {
  constructor(
    @Inject(ADMIN_PAGE_MENU_CONFIG) public menuItemsConfig: MenuItemConfig[]
  ) {}

  getMenuItemKey(index: number, menuItemConfig: MenuItemConfig): string {
    return menuItemConfig.text;
  }
}
