import { User } from 'app/core/models/user/user.interface';
import { AuthActionReducers } from './auth.reducers';
import { UserRole } from 'app/core/models/user/user-role.enum';
import { AuthSession } from './auth.feature';
import { AuthActions } from './auth.actions';

describe('Auth action reducers', () => {
  const mockUser1: User = {
    id: '1',
    name: 'admin',
    role: UserRole.Admin,
  };

  const mockUser2: User = {
    id: '2',
    name: 'user',
    role: UserRole.User,
  };

  const token1 = '001@1234567890';
  const token2 = '002@2345678901';

  const mockExpiresAt1 = new Date();
  const mockExpiresAt2 = new Date();

  const mockState1: AuthSession = {
    user: mockUser1,
    token: token1,
    expiresAt: mockExpiresAt1,
  };

  const mockState2: AuthSession = {
    user: mockUser2,
    token: token2,
    expiresAt: mockExpiresAt2,
  };

  describe('loginSuccessReducer', () => {
    it('should overwrite auth state with new session data', () => {
      const mockAction = AuthActions.loginSuccess({ sessionData: mockState2 });

      expect(
        AuthActionReducers.loginSuccessReducer(mockState1, mockAction)
      ).toEqual(mockState2);
    });
  });

  describe('loginFailureReducer', () => {
    it('should clear auth state', () => {
      const mockAction = AuthActions.loginFailure({
        error: 'Invalid credentials',
      });

      expect(
        AuthActionReducers.loginFailureReducer(mockState1, mockAction)
      ).toBe(undefined);
    });
  });

  describe('logoutSuccessReducer', () => {
    it('should clear auth state', () => {
      const mockAction = AuthActions.logoutSuccess();

      expect(
        AuthActionReducers.logoutSuccessReducer(mockState1, mockAction)
      ).toBe(undefined);
    });
  });

  describe('logoutFailureReducer', () => {
    it('should clear auth state', () => {
      const mockAction = AuthActions.logoutFailure({
        error: 'Failed to log out',
      });

      expect(
        AuthActionReducers.logoutFailureReducer(mockState1, mockAction)
      ).toBe(undefined);
    });
  });
});
