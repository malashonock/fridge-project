import { NgModule } from '@angular/core';

import { SharedModule } from 'shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AdminIndexComponent } from './components/admin-index/admin-index.component';
import { ProductsComponent } from './components/products/products.component';
import { FridgesComponent } from './components/fridges/fridges.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { MobilePageDirective } from 'shared/directives/mobile/page/mobile-page.directive';
import { adminPageMenuConfigProvider } from 'core/configs/admin-page-menu.config';
import { FridgeCardComponent } from './components/fridge-card/fridge-card.component';
import { FridgesGridComponent } from './components/fridges-grid/fridges-grid.component';
import { FridgeFormComponent } from './components/fridge-form/fridge-form.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    AdminIndexComponent,
    ProductsComponent,
    FridgesComponent,
    ProductDetailsComponent,
    ProductsTableComponent,
    ProductFormComponent,
    FridgeCardComponent,
    FridgesGridComponent,
    FridgeFormComponent,
  ],
  exports: [AdminPageComponent],
  imports: [SharedModule, AdminRoutingModule, MobilePageDirective],
  providers: [adminPageMenuConfigProvider],
})
export class AdminModule {}
