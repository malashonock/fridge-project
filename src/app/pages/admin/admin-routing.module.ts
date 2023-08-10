import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AdminPageComponent,
  AdminIndexComponent,
  ProductsComponent,
  FridgesComponent,
} from './components';
import { MapComponent } from 'shared/components';

const routes: Routes = [
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
        component: MapComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
