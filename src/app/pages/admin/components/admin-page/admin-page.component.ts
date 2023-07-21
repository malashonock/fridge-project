import { Component } from '@angular/core';

import { MenuItemConfig } from 'app/shared/components/menu-item/menu-item.component';
import { MobilePageDirective } from 'app/shared/directives/mobile/page/mobile-page.directive';
import { adminPageMenuConfig } from '../../admin.menu-config';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  hostDirectives: [MobilePageDirective],
})
export class AdminPageComponent {
  readonly menuConfig: MenuItemConfig[] = adminPageMenuConfig;

  getMenuItemKey(index: number, menuItemConfig: MenuItemConfig): string {
    return menuItemConfig.text;
  }
}
