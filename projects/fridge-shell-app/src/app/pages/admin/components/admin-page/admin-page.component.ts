import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { MenuItemConfig } from '@shell/shared/components/menu-item/menu-item.component';
import { menuItemTrackBy } from '@shell/utils/menu-item/menu-item.utils';
import { ADMIN_PAGE_MENU_CONFIG } from '@shell/core/configs/admin-page-menu.config';
import { MobilePageDirective } from '@shell/shared/directives/mobile/page/mobile-page.directive';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  hostDirectives: [MobilePageDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPageComponent {
  public constructor(
    @Inject(ADMIN_PAGE_MENU_CONFIG) public menuItemsConfig: MenuItemConfig[]
  ) {}

  public menuItemTrackBy = menuItemTrackBy;
}
