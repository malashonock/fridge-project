import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AdminIndexComponent } from './components/admin-index/admin-index.component';
import { MobilePageDirective } from 'app/shared/directives/mobile/page/mobile-page.directive';
import { ProductsComponent } from './components/products/products.component';
import { FridgesComponent } from './components/fridges/fridges.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    AdminIndexComponent,
    ProductsComponent,
    FridgesComponent,
  ],
  exports: [AdminPageComponent],
  imports: [SharedModule, AdminRoutingModule, MobilePageDirective],
})
export class AdminModule {}
