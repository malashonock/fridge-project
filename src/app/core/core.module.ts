import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { productCategoriesProvider } from './configs/product-categories.config';
import { userRolesProvider } from './configs/user-roles.config';
import { weightUnitsProvider } from './configs/weight-units.config';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    productCategoriesProvider,
    userRolesProvider,
    weightUnitsProvider,
  ],
})
export class CoreModule {}
