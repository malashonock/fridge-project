import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';

import { CoreModule } from 'core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from 'store/app-store.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, LayoutModule, AppRoutingModule, AppStoreModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
