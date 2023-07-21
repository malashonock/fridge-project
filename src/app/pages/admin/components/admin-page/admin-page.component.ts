import { Component } from '@angular/core';

import { MenuItemConfig } from 'app/shared/components/menu-item/menu-item.component';
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

  getMenuItemKey(index: number, menuItemConfig: MenuItemConfig): string {
    return menuItemConfig.text;
  }
}
