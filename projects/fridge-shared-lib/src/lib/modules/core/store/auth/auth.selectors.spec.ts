import {
  selectAuthToken,
  selectLoggedUser,
  selectSessionExpirationTime,
} from './auth.selectors';
import { mockUser } from '../../../../mocks/user.mocks';
import { mockUserSession } from '../../../../mocks/auth.mocks';

describe('Auth feature selectors', () => {
  describe('selectLoggedUser', () => {
    it('should select user from auth session data', () => {
      expect(selectLoggedUser.projector(mockUserSession)).toBe(mockUser);
    });
  });

  describe('selectAuthToken', () => {
    it('should select access token from auth session data', () => {
      expect(selectAuthToken.projector(mockUserSession)).toBe(
        mockUserSession.token
      );
    });
  });
  describe('selectSessionExpirationTime', () => {
    it('should select token expiration date from auth session data', () => {
      expect(selectSessionExpirationTime.projector(mockUserSession)).toBe(
        mockUserSession.expiresAt
      );
    });
  });
});
