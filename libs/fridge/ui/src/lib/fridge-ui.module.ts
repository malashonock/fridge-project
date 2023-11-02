import { NgModule } from '@angular/core';

import { AddressLabelPipe } from './pipes/address-label/address-label.pipe';

const pipes = [AddressLabelPipe];

@NgModule({
  imports: [pipes],
  exports: [pipes],
})
export class FridgeUiModule {}
