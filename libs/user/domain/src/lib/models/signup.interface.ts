import { UserRole } from './user-role.enum';

export interface SignupCredentials {
  userName: string;
  email: string;
  role: UserRole;
  password: string;
  passwordConfirm: string;
}
