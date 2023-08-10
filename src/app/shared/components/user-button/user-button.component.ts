import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { User } from 'core/models/user/user.interface';
import { AuthActions } from 'app/state/auth/auth.actions';
import { selectLoggedUser } from 'app/state/auth/auth.selectors';

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserButtonComponent {
  public userName$ = this.store
    .select(selectLoggedUser)
    .pipe(map((user: User | undefined): string => user?.name || ''));

  public constructor(private store: Store) {}

  public logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
