import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UiFacade } from 'private-shared-data-access';

@Component({
  selector: 'lib-burger-button',
  templateUrl: './burger-button.component.html',
  styleUrls: ['./burger-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BurgerButtonComponent {
  public showMobileMenu$ = this.uiFacade.getShowSideMenu$();

  public constructor(private uiFacade: UiFacade) {}

  public toggleMobileMenu(): void {
    this.uiFacade.toggleSideMenu();
  }
}
