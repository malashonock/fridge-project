import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'shared-ui';

import { AuthPageComponent } from './components/auth-page/auth-page.component';

@NgModule({
  declarations: [AuthPageComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
})
export class AuthFeatureMainModule {}
