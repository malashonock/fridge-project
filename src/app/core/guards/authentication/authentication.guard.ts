import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import { AuthSessionState } from 'app/state/auth/auth.feature';
import { selectAuthState } from 'app/state/auth/auth.selectors';
import { UserRole } from 'app/core/models/user/user-role.model';

export class AuthenticationGuard {
  static forAuthenticated(): CanActivateFn {
    return (): Observable<boolean> => {
      return inject(Store)
        .select(selectAuthState)
        .pipe(
          map((authState: AuthSessionState): boolean => {
            return authState !== undefined;
          })
        );
    };
  }

  static forUnauthenticated(): CanActivateFn {
    return (): Observable<boolean | UrlTree> => {
      const router = inject(Router);

      return inject(Store)
        .select(selectAuthState)
        .pipe(
          map((authState: AuthSessionState): boolean | UrlTree => {
            // Let unauthenticated user in
            if (authState === undefined) {
              return true;
            }

            // Redirect depending on user roley
            switch (authState.user.role) {
              case UserRole.Admin:
                return router.parseUrl('/admin');
              case UserRole.User:
              default:
                return router.parseUrl('/user');
            }
          })
        );
    };
  }
}
