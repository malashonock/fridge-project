import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import {
  MenuItemConfig,
  menuItemTrackBy,
} from 'shared/components/menu-item/menu-item.component';
import { ADMIN_PAGE_MENU_CONFIG } from 'core/configs/admin-page-menu.config';
import { MobilePageDirective } from 'shared/directives/mobile/page/mobile-page.directive';

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
