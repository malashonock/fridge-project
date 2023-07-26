import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import { User } from 'core/models';
import { AuthActions, selectLoggedUser } from 'app/state/auth';

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserButtonComponent {
  public userName$: Observable<string>;

  public constructor(private store: Store) {
    this.userName$ = this.store
      .select(selectLoggedUser)
      .pipe(map((user: User | undefined): string => user?.name || ''));
  }

  public logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
