import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';

import { AuthorizationGuard } from './authorization.guard';
import { AuthSessionState } from '@shell/store/auth/auth.feature';
import { UserRole } from '@shell/core/models/user/user-role.enum';

describe('AuthorizationGuard', () => {
  let router: Router;
  let routerStateSnapshot: RouterStateSnapshot;
  let activatedRouteSnapshot: ActivatedRouteSnapshot;

  const setup = (initialAuthState: AuthSessionState) => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        provideMockStore({
          initialState: {
            auth: initialAuthState,
          },
        }),
      ],
    });

    router = TestBed.inject(Router);
    routerStateSnapshot = router.routerState.snapshot;
    activatedRouteSnapshot = routerStateSnapshot.root;
  };

  describe('forRoles()', () => {
    it('given an authenticated user with a matching role, should allow navigation', (done) => {
      setup({
        user: {
          id: '1',
          name: 'John Doe',
          role: UserRole.Admin,
        },
        token: '001@1234567890',
        expiresAt: new Date(),
      });

      const adminGuard = AuthorizationGuard.forRoles([UserRole.Admin]);
      (
        TestBed.runInInjectionContext(() =>
          adminGuard(activatedRouteSnapshot, routerStateSnapshot)
        ) as Observable<boolean>
      ).subscribe((result) => {
        expect(result).toBe(true);
        done();
      });
    });

    it('given an authenticated user with an unauthorized role, should block navigation', (done) => {
      setup({
        user: {
          id: '1',
          name: 'John Doe',
          role: UserRole.User,
        },
        token: '001@1234567890',
        expiresAt: new Date(),
      });

      const adminGuard = AuthorizationGuard.forRoles([UserRole.Admin]);
      (
        TestBed.runInInjectionContext(() =>
          adminGuard(activatedRouteSnapshot, routerStateSnapshot)
        ) as Observable<boolean>
      ).subscribe((result) => {
        expect(result).toBe(false);
        done();
      });
    });

    it('given an unauthenticated user, should block navigation', (done) => {
      setup(undefined);

      const adminGuard = AuthorizationGuard.forRoles([UserRole.Admin]);
      (
        TestBed.runInInjectionContext(() =>
          adminGuard(activatedRouteSnapshot, routerStateSnapshot)
        ) as Observable<boolean>
      ).subscribe((result) => {
        expect(result).toBe(false);
        done();
      });
    });
  });
});
