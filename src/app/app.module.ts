import { NgModule, isDevMode } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { LayoutModule } from '@angular/cdk/layout';

import { CoreModule } from 'core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authFeature } from './state/auth/auth.feature';
import { AuthEffects } from './state/auth/auth.effects';
import { uiFeature } from './state/ui/ui.feature';
import { UiEffects } from './state/ui/ui.effects';
import { productsFeature } from './state/products/products.feature';
import { ProductsEffects } from './state/products/products.effects';
import { fridgesFeature } from './state/fridges/fridges.feature';
import { FridgesEffects } from './state/fridges/fridges.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    LayoutModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {
        [authFeature.name]: authFeature.reducer,
        [uiFeature.name]: uiFeature.reducer,
        [productsFeature.name]: productsFeature.reducer,
        [fridgesFeature.name]: fridgesFeature.reducer,
      },
      {}
    ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([
      AuthEffects,
      UiEffects,
      ProductsEffects,
      FridgesEffects,
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
