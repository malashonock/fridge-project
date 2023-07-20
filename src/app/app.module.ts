import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authSlice } from './state/auth/auth.slice';
import { AuthEffects } from './state/auth/auth.effects';
import { AuthSessionInitializer } from './core/services/auth/auth-session.initializer';
import { httpInterceptorProviders } from './core/interceptors';
import { uiSlice } from './state/ui/ui.slice';
import { UiEffects } from './state/ui/ui.effects';

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
      { [authSlice.name]: authSlice.reducer, [uiSlice.name]: uiSlice.reducer },
      {}
    ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([AuthEffects, UiEffects]),
  ],
  providers: [AuthSessionInitializer, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
