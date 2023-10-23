import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { uiFeature } from './state/ui.feature';
import { UiEffects } from './state/ui.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(uiFeature.name, uiFeature.reducer),
    EffectsModule.forFeature([UiEffects]),
  ],
})
export class PrivateSharedDataAccessModule {}
