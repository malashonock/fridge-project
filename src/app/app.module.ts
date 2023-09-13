import { NgModule, isDevMode } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { LayoutModule } from '@angular/cdk/layout';

import { CoreModule } from 'core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authFeature } from 'store/auth/auth.feature';
import { AuthEffects } from 'store/auth/auth.effects';
import { uiFeature } from 'store/ui/ui.feature';
import { UiEffects } from 'store/ui/ui.effects';
import { productsFeature } from 'store/products/products.feature';
import { ProductsEffects } from 'store/products/products.effects';
import { fridgesFeature } from 'store/fridges/fridges.feature';
import { FridgesEffects } from 'store/fridges/fridges.effects';

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
