import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserRoleLabelPipe, MaterialModule } from 'fridge-shared-lib';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

@NgModule({
  declarations: [AuthPageComponent, LoginFormComponent, SignupFormComponent],
  exports: [AuthPageComponent],
  imports: [
    AuthRoutingModule,
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    UserRoleLabelPipe,
  ],
})
export class AuthModule {}
