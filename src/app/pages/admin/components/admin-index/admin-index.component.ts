import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import {
  MenuItemConfig,
  MenuItemVariant,
} from 'app/shared/components/menu-item/menu-item.component';
import { ADMIN_PAGE_MENU_CONFIG } from 'app/core/configs/admin-page-menu.config';

@Component({
  selector: 'app-admin-index',
  templateUrl: './admin-index.component.html',
  styleUrls: ['./admin-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminIndexComponent {
  MenuItemVariant = MenuItemVariant;

  constructor(
    @Inject(ADMIN_PAGE_MENU_CONFIG) public menuItemsConfig: MenuItemConfig[]
  ) {}
}
