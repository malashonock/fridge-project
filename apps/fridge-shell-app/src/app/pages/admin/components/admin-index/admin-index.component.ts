import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { menuItemTrackBy } from 'fridge-shared-lib';

import { MenuItemConfig, MenuItemVariant } from 'fridge-shared-lib';
import { ADMIN_PAGE_MENU_CONFIG } from '../../configs/admin-page-menu.config';

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
