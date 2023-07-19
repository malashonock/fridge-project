import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import { User } from 'app/core/models/user/user.model';
import { selectLoggedUser } from 'app/state/auth/auth.selectors';
import { AuthActions } from 'app/state/auth/auth.actions';

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserButtonComponent {
  userName$: Observable<string>;

  constructor(private store: Store) {
    this.userName$ = this.store
      .select(selectLoggedUser)
      .pipe(map((user: User | undefined): string => user?.name || ''));
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
