import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';

import { AuthenticationGuard, AuthorizationGuard } from 'user-data-access';
import { UserRole } from 'user-domain';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    canMatch: [AuthenticationGuard.forUnauthenticated()],
    loadChildren: () =>
      loadRemoteModule('auth', './Module').then((m) => m.RemoteEntryModule),
  },
  {
    path: '',
    canMatch: [AuthenticationGuard.forAuthenticated()],
    children: [
      {
        path: 'admin',
        canMatch: [AuthorizationGuard.forRoles([UserRole.Admin])],
        loadChildren: () =>
          loadRemoteModule('admin', './Module').then(
            (m) => m.RemoteEntryModule
          ),
      },
    ],
  },
];
