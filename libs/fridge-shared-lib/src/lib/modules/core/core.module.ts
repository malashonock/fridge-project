import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InitializersModule } from './initializers/initializers.module';
import { httpInterceptorProviders } from './interceptors';
import { RootStoreModule } from './store/root-store.module';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { AuthService } from './services/auth/auth.service';
import { FormDataService } from './services/form-data/form-data.service';
import { FridgeService } from './services/fridge/fridge.service';
import { ProductService } from './services/product/product.service';
import { StaticAssetService } from './services/static-asset/static-asset.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RootStoreModule,
    InitializersModule,
    HttpClientModule,
  ],
  providers: [
    LocalStorageService,
    AuthService,
    FormDataService,
    FridgeService,
    ProductService,
    StaticAssetService,
    httpInterceptorProviders,
  ],
})
export class CoreModule {
  public static forRoot(environment: any): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [{ provide: 'ENV', useValue: environment }],
    };
  }
}
