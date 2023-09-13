import { AuthSession } from '@shell/store/auth/auth.feature';
import { mockAdmin, mockUser } from './user.mocks';
import { SignupCredentials } from '@shell/core/models/auth/signup.interface';
import { LoginCredentials } from '@shell/core/models/auth/login.interface';

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

export const mockSignupCredentials: SignupCredentials = {
  userName: mockUser.name,
  email: 'user@domain.com',
  role: mockUser.role,
  password: '12345',
  passwordConfirm: '12345',
};

export const mockLoginCredentials: LoginCredentials = {
  userName: mockUser.name,
  password: mockSignupCredentials.password,
};
