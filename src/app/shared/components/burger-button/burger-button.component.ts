import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { UiActions } from 'app/state/ui/ui.actions';
import { selectShowSideMenu } from 'app/state/ui/ui.selectors';

@Component({
  selector: 'app-burger-button',
  templateUrl: './burger-button.component.html',
  styleUrls: ['./burger-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BurgerButtonComponent {
  showMobileMenu$: Observable<boolean>;

  constructor(private store: Store) {
    this.showMobileMenu$ = this.store.select(selectShowSideMenu);
  }

  toggleMobileMenu(): void {
    this.store.dispatch(UiActions.toggleSideMenu());
  }
}