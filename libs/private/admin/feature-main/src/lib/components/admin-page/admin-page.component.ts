import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { menuItemTrackBy, MenuItemConfig } from 'shared-ui';

import { ADMIN_PAGE_MENU_CONFIG } from '../../configs/admin-page-menu.config';

@Component({
  selector: 'lib-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPageComponent {
  public constructor(
    @Inject(ADMIN_PAGE_MENU_CONFIG) public menuItemsConfig: MenuItemConfig[]
  ) {}

  public menuItemTrackBy = menuItemTrackBy;
}
