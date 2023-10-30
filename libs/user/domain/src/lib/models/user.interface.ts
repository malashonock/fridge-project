import { UserRole } from './user-role.enum';

export interface User {
  id: string;
  name: string;
  role: UserRole;
}
