import { NgModule } from '@angular/core';

import { CoreModule } from 'core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from 'store/app-store.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, AppRoutingModule, AppStoreModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
