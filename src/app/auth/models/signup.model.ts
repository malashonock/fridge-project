import { UserRole } from 'app/shared/models/user/user-role.model';

export interface SignupCredentials {
  userName: string;
  email: string;
  role: UserRole;
  password: string;
  passwordConfirm: string;
}
