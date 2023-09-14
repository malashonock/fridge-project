import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MobilePageDirective } from '@shared/layout/directives/mobile-page/mobile-page.directive';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  hostDirectives: [MobilePageDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
