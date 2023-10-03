import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PrivateSharedFeatureLayoutModule } from 'private-shared-feature-layout';
import { MenuItemComponent } from 'shared-ui';

import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AdminIndexComponent } from './components/admin-index/admin-index.component';
import { adminPageMenuConfigProvider } from './configs/admin-page-menu.config';

@NgModule({
  declarations: [AdminPageComponent, AdminIndexComponent],
  exports: [AdminPageComponent, AdminIndexComponent],
  imports: [
    CommonModule,
    RouterModule,
    PrivateSharedFeatureLayoutModule,
    MenuItemComponent,
  ],
  providers: [adminPageMenuConfigProvider],
})
export class PrivateAdminFeatureMainModule {}
