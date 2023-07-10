import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { SignupFormComponent } from './forms/signup-form/signup-form.component';

@NgModule({
  declarations: [AuthPageComponent, LoginFormComponent, SignupFormComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
