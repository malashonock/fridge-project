import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InitializersModule } from './initializers/initializers.module';
import { httpInterceptorProviders } from './interceptors';
import { RootStoreModule } from './store/root-store.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RootStoreModule,
    InitializersModule,
    HttpClientModule,
  ],
  providers: [httpInterceptorProviders],
})
export class CoreModule {
  public static forRoot(environment: any): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [{ provide: 'ENV', useValue: environment }],
    };
  }
}
