import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from '@shell/core/guards/authentication/authentication.guard';
import { AuthorizationGuard } from '@shell/core/guards/authorization/authorization.guard';
import { UserRole } from '@shell/core/models/user/user-role.enum';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [AuthenticationGuard.forUnauthenticated()],
  },
  {
    path: '',
    canActivate: [AuthenticationGuard.forAuthenticated()],
    children: [
      {
        path: 'admin',
        loadChildren: () =>
          import('./pages/admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AuthorizationGuard.forRoles([UserRole.Admin])],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
