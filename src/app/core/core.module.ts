import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { productCategoriesProvider } from './configs/product-categories.config';
import { userRolesProvider } from './configs/user-roles.config';
import { weightUnitsProvider } from './configs/weight-units.config';
import { nutrientsProvider } from './configs/nutrient.config';
import { periodsProvider } from './configs/periods.config';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    productCategoriesProvider,
    userRolesProvider,
    weightUnitsProvider,
    nutrientsProvider,
    periodsProvider,
  ],
})
export class CoreModule {}
