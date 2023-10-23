import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrivateAdminFeatureMainModule } from 'private-admin-feature-main';
import { ProductDataAccessModule } from 'product-data-access';
import { ProductFeatureListModule } from 'product-feature-list';
import { FridgeDataAccessModule } from 'fridge-data-access';
import { FridgeFeatureListModule } from 'fridge-feature-list';
import { FridgeFeatureMapModule } from 'fridge-feature-map';

import { remoteEntryRoutes } from './remote-entry.routes';

@NgModule({
  imports: [
    PrivateAdminFeatureMainModule,
    ProductDataAccessModule,
    ProductFeatureListModule,
    FridgeDataAccessModule,
    FridgeFeatureListModule,
    FridgeFeatureMapModule,
    RouterModule.forChild(remoteEntryRoutes),
  ],
})
export class RemoteEntryModule {}
