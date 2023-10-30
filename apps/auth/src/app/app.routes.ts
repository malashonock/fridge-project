import { Route } from '@angular/router';

import { PageNotFoundComponent } from 'shared-ui';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/remote-entry/remote-entry.module').then(
        (m) => m.RemoteEntryModule
      ),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
