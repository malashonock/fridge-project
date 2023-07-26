import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

@NgModule({
  declarations: [AuthPageComponent, LoginFormComponent, SignupFormComponent],
  exports: [AuthPageComponent],
  imports: [SharedModule, AuthRoutingModule],
})
export class AuthModule {}
