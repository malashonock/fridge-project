import { NgModule } from '@angular/core';

import { CoreModule } from 'fridge-shared-lib';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '@shell/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule.forRoot(environment), AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
