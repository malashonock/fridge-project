import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'shared/shared.module';
import {
  AuthPageComponent,
  LoginFormComponent,
  SignupFormComponent,
} from './components';

@NgModule({
  declarations: [AuthPageComponent, LoginFormComponent, SignupFormComponent],
  exports: [AuthPageComponent],
  imports: [SharedModule, AuthRoutingModule],
})
export class AuthModule {}
