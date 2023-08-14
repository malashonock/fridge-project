import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { productCategoriesProvider } from './configs/product-category.config';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [productCategoriesProvider],
})
export class CoreModule {}
