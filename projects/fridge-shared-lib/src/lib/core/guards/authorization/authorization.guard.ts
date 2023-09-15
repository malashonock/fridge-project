import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import { UserRole } from '@shared/models/user/user-role.enum';
import { AuthSessionState } from '@shared/core/store/auth/auth.feature';
import { selectAuthState } from '@shared/core/store/auth/auth.selectors';

export class AuthorizationGuard {
  public static forRoles(roles: UserRole[]): CanActivateFn {
    return (): Observable<boolean> => {
      return inject(Store)
        .select(selectAuthState)
        .pipe(
          map((authState: AuthSessionState): boolean => {
            if (!authState) {
              return false;
            }

            return roles.includes(authState.user.role);
          })
        );
    };
  }
}
