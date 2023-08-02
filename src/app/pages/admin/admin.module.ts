import { NgModule } from '@angular/core';

import { SharedModule } from 'shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import {
  AdminPageComponent,
  AdminIndexComponent,
  ProductsComponent,
  FridgesComponent,
  ProductDetailsComponent,
  ProductsTableComponent,
} from './components';
import { ShelfLifePipe } from './pipes';
import { MobilePageDirective } from 'shared/directives';
import { adminPageMenuConfigProvider } from 'core/configs';
import { ProductFormComponent } from './components/product-form/product-form.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    AdminIndexComponent,
    ProductsComponent,
    FridgesComponent,
    ProductDetailsComponent,
    ProductsTableComponent,
    ProductFormComponent,
    ShelfLifePipe,
  ],
  exports: [AdminPageComponent],
  imports: [SharedModule, AdminRoutingModule, MobilePageDirective],
  providers: [adminPageMenuConfigProvider],
})
export class AdminModule {}
