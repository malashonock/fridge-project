import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { InitializersModule } from './initializers/initializers.module';
import { httpInterceptorProviders } from './interceptors';
import { RootStoreModule } from './store/root-store.module';

@NgModule({
  exports: [RootStoreModule, InitializersModule, HttpClientModule],
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
