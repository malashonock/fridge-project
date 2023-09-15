import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { cold, hot } from 'jest-marbles';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthEffects } from './auth.effects';
import { AuthService } from '@shared/modules/core/services/auth/auth.service';
import { AuthActions } from './auth.actions';
import { mockUser } from '@shared/mocks/user.mocks';
import {
  mockAdminSession,
  mockLoginCredentials,
  mockSignupCredentials,
  mockUserSession,
} from '@shared/mocks/auth.mocks';
import { LocalStorageService } from '@shared/modules/core/services/local-storage/local-storage.service';

describe('Auth feature effects', () => {
  let actions$ = new Observable<Action>();
  let authEffects: AuthEffects;
  let authService: AuthService;
  let mockRouter: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        AuthService,
        LocalStorageService,
      ],
    });

    authService = TestBed.inject(AuthService);
    authEffects = TestBed.inject(AuthEffects);

    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigateByUrl');
  });

  describe('signup$ effect', () => {
    it('should react only to signup action', () => {
      actions$ = hot('-a-', {
        a: AuthActions.logout(),
      });

      const expected = hot('---', {});

      expect(authEffects.signup$).toBeObservable(expected);
    });

    it('given auth service returns a valid payload, should trigger a signupSuccess action', () => {
      actions$ = hot('-a-', {
        a: AuthActions.signup({
          credentials: mockSignupCredentials,
        }),
      });

      jest.spyOn(authService, 'signup').mockReturnValue(
        cold('--b|', {
          b: mockUser,
        })
      );

      const expected = hot('---c', {
        c: AuthActions.signupSuccess({
          user: mockUser,
          password: mockSignupCredentials.password,
        }),
      });

      expect(authEffects.signup$).toBeObservable(expected);
    });

    it('given auth service returns an error, should trigger a signupFailure action', () => {
      actions$ = hot('-a-', {
        a: AuthActions.signup({
          credentials: mockSignupCredentials,
        }),
      });

      jest
        .spyOn(authService, 'signup')
        .mockReturnValue(cold('--#|', {}, new Error('Server error')));

      const expected = hot('---c', {
        c: AuthActions.signupFailure({ error: 'Server error' }),
      });

      expect(authEffects.signup$).toBeObservable(expected);
    });
  });

  describe('signupSuccess$ effect', () => {
    it('should react only to signupSuccess action', () => {
      actions$ = hot('-a-', {
        a: AuthActions.logout(),
      });

      const expected = hot('---', {});

      expect(authEffects.signupSuccess$).toBeObservable(expected);
    });

    it('should trigger an immediate login action', () => {
      actions$ = hot('-a-', {
        a: AuthActions.signupSuccess({
          user: mockUser,
          password: mockSignupCredentials.password,
        }),
      });

      const expected = hot('-b-', {
        b: AuthActions.login({
          credentials: mockLoginCredentials,
        }),
      });

      expect(authEffects.signupSuccess$).toBeObservable(expected);
    });
  });

  describe('login$ effect', () => {
    it('should react only to login action', () => {
      actions$ = hot('-a-', {
        a: AuthActions.logout(),
      });

      const expected = hot('---', {});

      expect(authEffects.login$).toBeObservable(expected);
    });

    it('given auth service returns a valid payload, should trigger a loginSuccess action', () => {
      actions$ = hot('-a-', {
        a: AuthActions.login({
          credentials: mockLoginCredentials,
        }),
      });

      jest.spyOn(authService, 'login').mockReturnValue(
        cold('--b|', {
          b: mockUserSession,
        })
      );

      const expected = hot('---c', {
        c: AuthActions.loginSuccess({
          sessionData: mockUserSession,
        }),
      });

      expect(authEffects.login$).toBeObservable(expected);
    });

    it('given auth service returns an error, should trigger a loginFailure action', () => {
      actions$ = hot('-a-', {
        a: AuthActions.login({
          credentials: mockLoginCredentials,
        }),
      });

      jest
        .spyOn(authService, 'login')
        .mockReturnValue(cold('--#|', {}, new Error('Server error')));

      const expected = hot('---c', {
        c: AuthActions.loginFailure({ error: 'Server error' }),
      });

      expect(authEffects.login$).toBeObservable(expected);
    });
  });

  describe('loginSuccess$ effect', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: {
          pathname: '/auth/login',
        },
      });
    });

    it('should not emit any other actions', () => {
      actions$ = hot('-a-', {
        a: AuthActions.loginSuccess({
          sessionData: mockUserSession,
        }),
      });

      const expected = hot('-a-', {
        a: AuthActions.loginSuccess({
          sessionData: mockUserSession,
        }),
      });

      expect(authEffects.loginSuccess$).toBeObservable(expected);
    });

    describe('given user role is plain user', () => {
      it('given the user has just logged in, should redirect to /user url', () => {
        actions$ = hot('a', {
          a: AuthActions.loginSuccess({
            sessionData: mockUserSession,
          }),
        });

        // Trigger the action
        authEffects.loginSuccess$.subscribe();

        // Wait for tap to complete soon
        waitForAsync(() => {
          expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/user');
        });
      });

      it('given the user is already within /user/* route, should just reload the page', () => {
        Object.defineProperty(window, 'location', {
          value: {
            pathname: '/user/fridges',
          },
        });

        actions$ = hot('a', {
          a: AuthActions.loginSuccess({
            sessionData: mockUserSession,
          }),
        });

        // Trigger the action
        authEffects.loginSuccess$.subscribe();

        // Wait for tap to complete soon
        waitForAsync(() => {
          expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(
            '/user/fridges'
          );
        });
      });
    });

    describe('given user role is admin', () => {
      it('given the user has just logged in, should redirect to /admin url', () => {
        actions$ = hot('a', {
          a: AuthActions.loginSuccess({
            sessionData: mockAdminSession,
          }),
        });

        // Trigger the action
        authEffects.loginSuccess$.subscribe();

        // Wait for tap to complete soon
        waitForAsync(() => {
          expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/admin');
        });
      });

      it('given the user is already within /admin/* route, should just reload the page', () => {
        Object.defineProperty(window, 'location', {
          value: {
            pathname: '/admin/fridges',
          },
        });

        actions$ = hot('a', {
          a: AuthActions.loginSuccess({
            sessionData: mockUserSession,
          }),
        });

        // Trigger the action
        authEffects.loginSuccess$.subscribe();

        // Wait for tap to complete soon
        waitForAsync(() => {
          expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(
            '/admin/fridges'
          );
        });
      });
    });
  });

  describe('logout$ effect', () => {
    it('should react only to logout action', () => {
      actions$ = hot('-a-', {
        a: AuthActions.login({
          credentials: mockLoginCredentials,
        }),
      });

      const expected = hot('---', {});

      expect(authEffects.logout$).toBeObservable(expected);
    });

    it('given auth service returns a valid payload, should trigger a logoutSuccess action', () => {
      actions$ = hot('-a-', {
        a: AuthActions.logout(),
      });

      jest.spyOn(authService, 'logout').mockReturnValue(
        cold('--b|', {
          b: undefined,
        })
      );

      const expected = hot('---c', {
        c: AuthActions.logoutSuccess(),
      });

      expect(authEffects.logout$).toBeObservable(expected);
    });

    it('given auth service returns an error, should trigger a logoutFailure action', () => {
      actions$ = hot('-a-', {
        a: AuthActions.logout(),
      });

      jest
        .spyOn(authService, 'logout')
        .mockReturnValue(cold('--#|', {}, new Error('Server error')));

      const expected = hot('---c', {
        c: AuthActions.logoutFailure({ error: 'Server error' }),
      });

      expect(authEffects.logout$).toBeObservable(expected);
    });
  });

  describe('logoutFinish$ effect', () => {
    it('should redirect to /auth/login url after successful logout', () => {
      actions$ = hot('a', {
        a: AuthActions.logoutSuccess(),
      });

      // Trigger the action
      authEffects.logoutFinish$.subscribe();

      // Wait for tap to complete soon
      waitForAsync(() => {
        expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/auth/login');
      });
    });

    it('should redirect to /auth/login url after logout failure', () => {
      actions$ = hot('a', {
        a: AuthActions.logoutFailure({
          error: 'Server error',
        }),
      });

      // Trigger the action
      authEffects.logoutFinish$.subscribe();

      // Wait for tap to complete soon
      waitForAsync(() => {
        expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/auth/login');
      });
    });
  });
});
