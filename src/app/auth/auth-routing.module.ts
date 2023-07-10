import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { SignupFormComponent } from './forms/signup-form/signup-form.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        component: LoginFormComponent,
      },
      {
        path: 'signup',
        component: SignupFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
