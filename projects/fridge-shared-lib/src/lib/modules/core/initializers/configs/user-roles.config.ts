import { InjectionToken, Provider } from '@angular/core';

import { UserRole } from '@shared/models/user/user-role.enum';

export const userRoles: UserRole[] = [UserRole.User, UserRole.Admin];

export const USER_ROLES = new InjectionToken<UserRole[]>('USER_ROLES');

export const userRolesProvider: Provider = {
  provide: USER_ROLES,
  useValue: userRoles,
};
