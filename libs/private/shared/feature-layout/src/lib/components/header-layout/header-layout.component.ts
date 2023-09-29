import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MobilePageDirective } from '../../directives/mobile-page/mobile-page.directive';

@Component({
  selector: 'lib-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.scss'],
  hostDirectives: [MobilePageDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderLayoutComponent {}
