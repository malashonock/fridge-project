import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AdminIndexComponent } from './components/admin-index/admin-index.component';
import { MobilePageDirective } from 'app/shared/directives/mobile/page/mobile-page.directive';

@NgModule({
  declarations: [AdminPageComponent, AdminIndexComponent],
  exports: [AdminPageComponent],
  imports: [SharedModule, AdminRoutingModule, MobilePageDirective],
})
export class AdminModule {}
