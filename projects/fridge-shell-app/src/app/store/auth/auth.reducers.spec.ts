import { AuthActionReducers } from './auth.reducers';
import { AuthActions } from './auth.actions';
import { mockAdminSession, mockUserSession } from '@shell/mocks/auth.mocks';

describe('Auth action reducers', () => {
  describe('loginSuccessReducer', () => {
    it('should overwrite auth state with new session data', () => {
      const mockAction = AuthActions.loginSuccess({
        sessionData: mockUserSession,
      });

      expect(
        AuthActionReducers.loginSuccessReducer(mockAdminSession, mockAction)
      ).toEqual(mockUserSession);
    });
  });

  describe('loginFailureReducer', () => {
    it('should clear auth state', () => {
      const mockAction = AuthActions.loginFailure({
        error: 'Invalid credentials',
      });

      expect(
        AuthActionReducers.loginFailureReducer(mockAdminSession, mockAction)
      ).toBe(undefined);
    });
  });

  describe('logoutSuccessReducer', () => {
    it('should clear auth state', () => {
      const mockAction = AuthActions.logoutSuccess();

      expect(
        AuthActionReducers.logoutSuccessReducer(mockAdminSession, mockAction)
      ).toBe(undefined);
    });
  });

  describe('logoutFailureReducer', () => {
    it('should clear auth state', () => {
      const mockAction = AuthActions.logoutFailure({
        error: 'Failed to log out',
      });

      expect(
        AuthActionReducers.logoutFailureReducer(mockAdminSession, mockAction)
      ).toBe(undefined);
    });
  });
});
