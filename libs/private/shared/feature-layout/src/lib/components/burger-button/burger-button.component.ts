import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { UiActions, selectShowSideMenu } from 'private-shared-data-access';

@Component({
  selector: 'lib-burger-button',
  templateUrl: './burger-button.component.html',
  styleUrls: ['./burger-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BurgerButtonComponent {
  public showMobileMenu$ = this.store.select(selectShowSideMenu);

  public constructor(private store: Store) {}

  public toggleMobileMenu(): void {
    this.store.dispatch(UiActions.toggleSideMenu());
  }
}
