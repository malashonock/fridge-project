import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { MenuItemConfig, menuItemTrackBy } from 'shared/components';
import { ADMIN_PAGE_MENU_CONFIG } from 'core/configs';
import { MobilePageDirective } from 'shared/directives';

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
