import {
  selectAuthToken,
  selectLoggedUser,
  selectSessionExpirationTime,
} from './auth.selectors';
import { AuthSession } from './auth.feature';
import { User } from 'core/models/user/user.interface';
import { UserRole } from 'core/models/user/user-role.enum';

describe('Auth feature selectors', () => {
  const mockUser: User = {
    id: '1',
    name: 'admin',
    role: UserRole.Admin,
  };
  const mockToken = '001@1234567890';
  const mockExpiresAt = new Date();

  const mockAuthSession: AuthSession = {
    user: mockUser,
    token: mockToken,
    expiresAt: mockExpiresAt,
  };

  describe('selectLoggedUser', () => {
    it('should select user from auth session data', () => {
      expect(selectLoggedUser.projector(mockAuthSession)).toBe(mockUser);
    });
  });

  describe('selectAuthToken', () => {
    it('should select access token from auth session data', () => {
      expect(selectAuthToken.projector(mockAuthSession)).toBe(mockToken);
    });
  });
  describe('selectSessionExpirationTime', () => {
    it('should select token expiration date from auth session data', () => {
      expect(selectSessionExpirationTime.projector(mockAuthSession)).toBe(
        mockExpiresAt
      );
    });
  });
});
