import { User } from './user.interface';

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: Date;
}
