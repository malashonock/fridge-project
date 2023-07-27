import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

import { CoreModule } from 'core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthSessionInitializer } from 'core/services';
import { httpInterceptorProviders } from 'core/interceptors';
import { authFeature, AuthEffects } from './state/auth';
import { uiFeature, UiEffects } from './state/ui';
import { productsFeature, ProductsEffects } from './state/products';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {
        [authFeature.name]: authFeature.reducer,
        [uiFeature.name]: uiFeature.reducer,
        [productsFeature.name]: productsFeature.reducer,
      },
      {}
    ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([AuthEffects, UiEffects, ProductsEffects]),
  ],
  providers: [AuthSessionInitializer, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
