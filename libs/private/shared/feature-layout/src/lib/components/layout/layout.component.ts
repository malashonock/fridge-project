import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MenuItemConfig, menuItemTrackBy } from 'shared-ui';

import { MobilePageDirective } from '../../directives/mobile-page/mobile-page.directive';

@Component({
  selector: 'lib-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [MobilePageDirective],
})
export class LayoutComponent {
  @Input() public menuItemsConfig: MenuItemConfig[] = [];
  public menuItemTrackBy = menuItemTrackBy;
}
