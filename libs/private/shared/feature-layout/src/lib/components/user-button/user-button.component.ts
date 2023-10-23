import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { User } from 'user-domain';
import { AuthActions, selectLoggedUser } from 'user-data-access';

@Component({
  selector: 'lib-user-button',
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
