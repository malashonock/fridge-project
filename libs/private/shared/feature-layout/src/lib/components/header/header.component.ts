import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UiFacade } from 'private-shared-data-access';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public mobileMode$ = this.uiFacade.getMobileMode$();

  public constructor(private uiFacade: UiFacade) {}
}
