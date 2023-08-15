import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { productCategoriesProvider } from './configs/product-category.config';
import { userRolesProvider } from './configs/user-role.config';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [productCategoriesProvider, userRolesProvider],
})
export class CoreModule {}
