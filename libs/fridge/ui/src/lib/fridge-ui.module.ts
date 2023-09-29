import { NgModule } from '@angular/core';

import { AnyPipe } from 'shared-ui';

import { AddressLabelPipe } from './pipes/address-label/address-label.pipe';

const pipes = [AddressLabelPipe];

@NgModule({
  imports: [AnyPipe, pipes],
  exports: [pipes],
})
export class FridgeUiModule {}
