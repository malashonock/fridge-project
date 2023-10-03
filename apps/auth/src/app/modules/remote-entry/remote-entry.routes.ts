import { Route } from '@angular/router';

import { AuthPageComponent } from 'auth-feature-main';
import { LoginFormComponent, SignupFormComponent } from 'user-feature-forms';

export const remoteEntryRoutes: Route[] = [
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
