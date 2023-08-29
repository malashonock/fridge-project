import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import {
  MenuItemConfig,
  MenuItemVariant,
} from 'shared/components/menu-item/menu-item.component';
import { menuItemTrackBy } from 'utils/menu-item/menu-item.utils';
import { ADMIN_PAGE_MENU_CONFIG } from 'core/configs/admin-page-menu.config';

@Component({
  selector: 'app-admin-index',
  templateUrl: './admin-index.component.html',
  styleUrls: ['./admin-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminIndexComponent {
  public MenuItemVariant = MenuItemVariant;

  public constructor(
    @Inject(ADMIN_PAGE_MENU_CONFIG) public menuItemsConfig: MenuItemConfig[]
  ) {}

  public menuItemTrackBy = menuItemTrackBy;
}
