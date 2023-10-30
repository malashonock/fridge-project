import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthFeatureMainModule } from 'auth-feature-main';
import { UserFeatureFormsModule } from 'user-feature-forms';

import { remoteEntryRoutes } from './remote-entry.routes';

@NgModule({
  imports: [
    AuthFeatureMainModule,
    UserFeatureFormsModule,
    RouterModule.forChild(remoteEntryRoutes),
  ],
})
export class RemoteEntryModule {}
