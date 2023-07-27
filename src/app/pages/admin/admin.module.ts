import { NgModule } from '@angular/core';

import { SharedModule } from 'shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import {
  AdminPageComponent,
  AdminIndexComponent,
  ProductsComponent,
  FridgesComponent,
} from './components';
import { MobilePageDirective } from 'shared/directives';
import { adminPageMenuConfigProvider } from 'core/configs';

@NgModule({
  declarations: [
    AdminPageComponent,
    AdminIndexComponent,
    ProductsComponent,
    FridgesComponent,
  ],
  exports: [AdminPageComponent],
  imports: [SharedModule, AdminRoutingModule, MobilePageDirective],
  providers: [adminPageMenuConfigProvider],
})
export class AdminModule {}