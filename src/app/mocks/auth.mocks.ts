import { AuthSession } from 'app/state/auth/auth.feature';
import { mockAdmin, mockUser } from './user.mocks';

export const mockUserSession: AuthSession = {
  user: mockUser,
  token: 'abc@123',
  expiresAt: new Date(),
};

export const mockAdminSession: AuthSession = {
  user: mockAdmin,
  token: 'def@456',
  expiresAt: new Date(),
};
