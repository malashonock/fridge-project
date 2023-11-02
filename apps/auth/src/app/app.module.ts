import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRootModule, RootComponent } from 'shared-ui';
import { RootStoreModule, SharedDataAccessModule } from 'shared-data-access';
import { UserDataAccessModule } from 'user-data-access';

import { appRoutes } from './app.routes';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRootModule,
    HttpClientModule,
    SharedDataAccessModule.forRoot(environment),
    RootStoreModule,
    UserDataAccessModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  bootstrap: [RootComponent],
})
export class AppModule {}
