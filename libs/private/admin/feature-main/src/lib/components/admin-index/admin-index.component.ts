import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { menuItemTrackBy, MenuItemConfig, MenuItemVariant } from 'shared-ui';

import { ADMIN_PAGE_MENU_CONFIG } from '../../configs/admin-page-menu.config';

@Component({
  selector: 'lib-admin-index',
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
