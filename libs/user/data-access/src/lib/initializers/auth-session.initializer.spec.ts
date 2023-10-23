import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

import { mockUserSession } from 'user-util-testing';

import { AuthActions } from '../state/auth.actions';
import { AuthService } from '../services/auth.service';
import { initializeAuthSessionFactory } from './auth-session.initializer';

describe('Auth session initializer', () => {
  const spyOnAuthServiceRestoreSession = jest.fn();
  let mockAuthService: AuthService;
  let mockStore: Store;
  let authSessionInitializer: () => void;

  beforeEach(() => {
    jest.resetAllMocks();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            restoreSession: spyOnAuthServiceRestoreSession,
          },
        },
        provideMockStore(),
      ],
    });

    mockAuthService = TestBed.inject(AuthService);

    mockStore = TestBed.inject(Store);
    jest.spyOn(mockStore, 'dispatch');

    authSessionInitializer = initializeAuthSessionFactory(
      mockAuthService,
      mockStore
    );
  });

  describe('given some session is cached', () => {
    const mockLoginSuccessAction = AuthActions.loginSuccess({
      sessionData: mockUserSession,
    });

    beforeEach(() => {
      spyOnAuthServiceRestoreSession.mockReturnValue(mockUserSession);
    });

    it('should dispatch a Login Success action', () => {
      authSessionInitializer();
      expect(mockStore.dispatch).toHaveBeenCalledWith(mockLoginSuccessAction);
    });
  });

  describe('given no session is cached', () => {
    const mockLogoutSuccessAction = AuthActions.logoutSuccess();

    beforeEach(() => {
      spyOnAuthServiceRestoreSession.mockReturnValue(undefined);
    });

    it('should dispatch a Logout Success action', () => {
      authSessionInitializer();
      expect(mockStore.dispatch).toHaveBeenCalledWith(mockLogoutSuccessAction);
    });
  });
});
