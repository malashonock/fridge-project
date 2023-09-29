import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'shared-ui';
import { UserRoleLabelPipe } from 'user-ui';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

@NgModule({
  declarations: [LoginFormComponent, SignupFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    UserRoleLabelPipe,
  ],
})
export class UserFeatureFormsModule {}
