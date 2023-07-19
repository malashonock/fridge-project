import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

@NgModule({
  declarations: [AdminPageComponent],
  exports: [AdminPageComponent],
  imports: [SharedModule, AdminRoutingModule],
})
export class AdminModule {}
