import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductUiModule } from 'product-ui';
import {
  MaterialModule,
  AnyPipe,
  SearchBoxComponent,
  OrPipe,
  MoneyPipe,
  ImgSkeletonComponent,
} from 'shared-ui';
import { StaticAssetUrlPipe } from 'shared-data-access';

import { ProductsComponent } from './components/products/products.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsTableComponent,
    ProductDetailsComponent,
  ],
  exports: [ProductsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    StaticAssetUrlPipe,
    AnyPipe,
    OrPipe,
    MoneyPipe,
    SearchBoxComponent,
    ProductUiModule,
    ImgSkeletonComponent,
  ],
})
export class ProductFeatureListModule {}
