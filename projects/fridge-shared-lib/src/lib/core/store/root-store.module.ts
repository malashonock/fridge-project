import { NgModule, isDevMode } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthEffects } from './auth/auth.effects';
import { authFeature } from './auth/auth.feature';
import { FridgesEffects } from './fridges/fridges.effects';
import { fridgesFeature } from './fridges/fridges.feature';
import { ProductsEffects } from './products/products.effects';
import { productsFeature } from './products/products.feature';
import { UiEffects } from './ui/ui.effects';
import { uiFeature } from './ui/ui.feature';

@NgModule({
  declarations: [],
  imports: [
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
})
export class RootStoreModule {}
