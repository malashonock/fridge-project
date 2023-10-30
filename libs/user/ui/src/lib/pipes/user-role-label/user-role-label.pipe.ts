import { Pipe, PipeTransform } from '@angular/core';

import { UserRole } from 'user-domain';

@Pipe({
  name: 'userRoleLabel',
  standalone: true,
})
export class UserRoleLabelPipe implements PipeTransform {
  public transform(userRole: UserRole): string {
    return (() => {
      switch (userRole) {
        case UserRole.Admin:
          return $localize`:@@admin:Admin`;
        case UserRole.User:
          return $localize`:@@user:User`;
        default:
          throw new Error('Unsupported user role');
      }
    })();
  }
}
