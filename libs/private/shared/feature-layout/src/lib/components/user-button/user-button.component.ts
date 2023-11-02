import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs';

import { User } from 'user-domain';
import { AuthFacade } from 'user-data-access';

@Component({
  selector: 'lib-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserButtonComponent {
  public userName$ = this.authFacade
    .getLoggedUser$()
    .pipe(map((user: User | undefined): string => user?.name || ''));

  public constructor(private authFacade: AuthFacade) {}

  public logout(): void {
    this.authFacade.logout();
  }
}
