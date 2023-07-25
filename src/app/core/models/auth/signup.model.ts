import { UserRole } from '../user/user-role.model';

export interface SignupCredentials {
  userName: string;
  email: string;
  role: UserRole;
  password: string;
  passwordConfirm: string;
}
