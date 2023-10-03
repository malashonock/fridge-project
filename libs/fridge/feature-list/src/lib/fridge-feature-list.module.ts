import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FridgeUiModule } from 'fridge-ui';
import { AnyPipe, MaterialModule, OrPipe, SearchBoxComponent } from 'shared-ui';
import { StaticAssetUrlPipe } from 'shared-data-access';

import { FridgeCardComponent } from './components/fridge-card/fridge-card.component';
import { FridgesGridComponent } from './components/fridges-grid/fridges-grid.component';
import { FridgesComponent } from './components/fridges/fridges.component';

@NgModule({
  declarations: [FridgeCardComponent, FridgesGridComponent, FridgesComponent],
  exports: [FridgesComponent, FridgeCardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FridgeUiModule,
    StaticAssetUrlPipe,
    AnyPipe,
    OrPipe,
    SearchBoxComponent,
  ],
  providers: [AnyPipe],
})
export class FridgeFeatureListModule {}
