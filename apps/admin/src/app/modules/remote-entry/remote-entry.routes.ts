import { Route } from '@angular/router';
import { FridgesComponent } from 'fridge-feature-list';
import { FridgesMapComponent } from 'fridge-feature-map';

import {
  AdminIndexComponent,
  AdminPageComponent,
} from 'private-admin-feature-main';
import { ProductsComponent } from 'product-feature-list';

export const remoteEntryRoutes: Route[] = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AdminIndexComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'fridges',
        component: FridgesComponent,
      },
      {
        path: 'map',
        component: FridgesMapComponent,
      },
    ],
  },
];
