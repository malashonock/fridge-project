import { ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { StaticAssetUrlPipe } from './pipes/static-asset-url/static-asset-url.pipe';
import { UrlInterceptor } from './interceptors/url/url.interceptor';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { StaticAssetService } from './services/static-asset/static-asset.service';

const pipes = [StaticAssetUrlPipe];

@NgModule({
  imports: [pipes],
  exports: [pipes],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
    LocalStorageService,
    StaticAssetService,
  ],
})
export class SharedDataAccessModule {
  public static forRoot(environment: {
    STATIC_ASSETS_BASE_URL: string;
    API_BASE_URL: string;
  }): ModuleWithProviders<SharedDataAccessModule> {
    return {
      ngModule: SharedDataAccessModule,
      providers: [{ provide: 'ENV', useValue: environment }],
    };
  }
}
