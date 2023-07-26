import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthSessionState } from 'app/state/auth';
import { UserRole } from 'core/models';
import { AuthenticationGuard } from './authentication.guard';

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

      it('should let the route be activated', (done) => {
        const authenticatedGuard = AuthenticationGuard.forAuthenticated();
        (
          TestBed.runInInjectionContext(() =>
            authenticatedGuard(activatedRouteSnapshot, routerStateSnapshot)
          ) as Observable<boolean>
        ).subscribe((result) => {
          expect(result).toBe(true);
          done();
        });
      });
    });

    describe('given there is NO logged in user', () => {
      beforeEach(() => {
        setup(undefined);
      });

      it('should NOT let the route be activated', (done) => {
        const authenticatedGuard = AuthenticationGuard.forAuthenticated();
        (
          TestBed.runInInjectionContext(() =>
            authenticatedGuard(activatedRouteSnapshot, routerStateSnapshot)
          ) as Observable<boolean>
        ).subscribe((result) => {
          expect(result).toBe(false);
          done();
        });
      });
    });
  });

  describe('forUnauthenticated()', () => {
    describe('given there is a logged in user', () => {
      it('should redirect admin users to /admin route', (done) => {
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
          ) as Observable<UrlTree | boolean>
        ).subscribe((result) => {
          expect(result.toString()).toBe(router.parseUrl('/admin').toString());
          done();
        });
      });

      it('should redirect plain users to /user route', (done) => {
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
          ) as Observable<UrlTree | boolean>
        ).subscribe((result) => {
          expect(result.toString()).toBe(router.parseUrl('/user').toString());
          done();
        });
      });
    });

    describe('given there is NO logged in user', () => {
      beforeEach(() => {
        setup(undefined);
      });

      it('should let the route be activated', (done) => {
        const unauthenticatedGuard = AuthenticationGuard.forUnauthenticated();
        (
          TestBed.runInInjectionContext(() =>
            unauthenticatedGuard(activatedRouteSnapshot, routerStateSnapshot)
          ) as Observable<boolean>
        ).subscribe((result) => {
          expect(result).toBe(true);
          done();
        });
      });
    });
  });
});
