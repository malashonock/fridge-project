import { UserRole } from 'core/models/user/user-role.enum';
import { User } from 'core/models/user/user.interface';

export const mockUser: User = {
  id: '1',
  name: 'user',
  role: UserRole.User,
};

export const mockAdmin: User = {
  id: '2',
  name: 'admin',
  role: UserRole.Admin,
};
