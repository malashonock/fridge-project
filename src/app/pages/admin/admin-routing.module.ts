import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AdminIndexComponent } from './components/admin-index/admin-index.component';
import { ProductsComponent } from './components/products/products.component';
import { FridgesComponent } from './components/fridges/fridges.component';
import { MapComponent } from 'shared/components/map/map.component';

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
