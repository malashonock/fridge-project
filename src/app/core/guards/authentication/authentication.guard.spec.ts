import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { AuthSessionState } from 'app/state/auth/auth.feature';
import { UserRole } from 'app/core/models/user/user-role.model';
import { AuthenticationGuard } from './authentication.guard';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthenticationGuard', () => {
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

  describe('forAuthenticated()', () => {
    describe('given there is a logged in user', () => {
      beforeEach(() => {
        setup({
          user: {
            id: '1',
            name: 'John Doe',
            role: UserRole.User,
          },
          token: '001@1234567890',
          expiresAt: new Date(),
        });
      });

      it('should let the route be activated', () => {
        const authenticatedGuard = AuthenticationGuard.forAuthenticated();
        (
          TestBed.runInInjectionContext(() =>
            authenticatedGuard(activatedRouteSnapshot, routerStateSnapshot)
          ) as Observable<boolean>
        ).subscribe({
          next: (result) => expect(result).toBe(true),
        });
      });
    });

    describe('given there is NO logged in user', () => {
      beforeEach(() => {
        setup(undefined);
      });

      it('should NOT let the route be activated', () => {
        const authenticatedGuard = AuthenticationGuard.forAuthenticated();
        (
          TestBed.runInInjectionContext(() =>
            authenticatedGuard(activatedRouteSnapshot, routerStateSnapshot)
          ) as Observable<boolean>
        ).subscribe({
          next: (result) => expect(result).toBe(false),
        });
      });
    });
  });

  describe('forUnauthenticated()', () => {
    describe('given there is a logged in user', () => {
      it('should redirect admin users to /admin route', () => {
        const unauthenticatedGuard = AuthenticationGuard.forUnauthenticated();

        setup({
          user: {
            id: '1',
            name: 'John Doe',
            role: UserRole.Admin,
          },
          token: '001@1234567890',
          expiresAt: new Date(),
        });

        (
          TestBed.runInInjectionContext(() =>
            unauthenticatedGuard(activatedRouteSnapshot, routerStateSnapshot)
          ) as Observable<boolean>
        ).subscribe({
          next: (result) => expect(result).toBe(router.parseUrl('/admin')),
        });
      });

      it('should redirect plain users to /user route', () => {
        const unauthenticatedGuard = AuthenticationGuard.forUnauthenticated();

        setup({
          user: {
            id: '1',
            name: 'John Doe',
            role: UserRole.User,
          },
          token: '001@1234567890',
          expiresAt: new Date(),
        });

        (
          TestBed.runInInjectionContext(() =>
            unauthenticatedGuard(activatedRouteSnapshot, routerStateSnapshot)
          ) as Observable<boolean>
        ).subscribe({
          next: (result) => expect(result).toBe(router.parseUrl('/user')),
        });
      });
    });

    describe('given there is NO logged in user', () => {
      beforeEach(() => {
        setup(undefined);
      });

      it('should let the route be activated', () => {
        const unauthenticatedGuard = AuthenticationGuard.forUnauthenticated();
        (
          TestBed.runInInjectionContext(() =>
            unauthenticatedGuard(activatedRouteSnapshot, routerStateSnapshot)
          ) as Observable<boolean>
        ).subscribe({
          next: (result) => expect(result).toBe(true),
        });
      });
    });
  });
});
