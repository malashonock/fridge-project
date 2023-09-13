import { NgModule } from '@angular/core';

import { CoreModule } from '@shell/core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from '@shell/store/app-store.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, AppRoutingModule, AppStoreModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
