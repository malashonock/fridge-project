import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FridgeRepository } from './repository/fridge.repository';
import { FridgesInitializer } from './initializers/fridges.initializer';
import { fridgesFeature } from './state/fridges.feature';
import { FridgesEffects } from './state/fridges.effects';

@NgModule({
  providers: [FridgeRepository, FridgesInitializer],
  imports: [
    StoreModule.forFeature(fridgesFeature.name, fridgesFeature.reducer),
    EffectsModule.forFeature([FridgesEffects]),
  ],
})
export class FridgeDataAccessModule {}
