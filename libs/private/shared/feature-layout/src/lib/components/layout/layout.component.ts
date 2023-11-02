import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MenuItemConfig, menuItemTrackBy } from 'shared-ui';

import { MobilePageDirective } from '../../directives/mobile-page/mobile-page.directive';
import { UiFacade } from 'private-shared-data-access';

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

  public loadingCount$ = this.uiFacade.getLoadingCount$();

  public constructor(private uiFacade: UiFacade) {}
}
