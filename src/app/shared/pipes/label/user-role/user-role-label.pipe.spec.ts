import { UserRole } from 'core/models/user/user-role.enum';
import { UserRoleLabelPipe } from './user-role-label.pipe';

describe('UserRoleLabelPipe', () => {
  let pipe: UserRoleLabelPipe;

  beforeEach(() => {
    pipe = new UserRoleLabelPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return appropriate user role representations', () => {
    expect(pipe.transform(UserRole.Admin)).toBe('Admin');
    expect(pipe.transform(UserRole.User)).toBe('User');
  });
});
