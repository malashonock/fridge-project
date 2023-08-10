import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { UiActions, selectShowSideMenu } from 'app/state/ui';

@Component({
  selector: 'app-burger-button',
  templateUrl: './burger-button.component.html',
  styleUrls: ['./burger-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BurgerButtonComponent {
  public showMobileMenu$: Observable<boolean>;

  public constructor(private store: Store) {
    this.showMobileMenu$ = this.store.select(selectShowSideMenu);
  }

  public toggleMobileMenu(): void {
    this.store.dispatch(UiActions.toggleSideMenu());
  }
}
