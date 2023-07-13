import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { SignupFormComponent } from './forms/signup-form/signup-form.component';
import { SentenceCasePipe } from 'app/shared/pipes/sentence-case/sentence-case.pipe';
import { SplitCamelCasePipe } from 'app/shared/pipes/split-camel-case/split-camel-case.pipe';

@NgModule({
  declarations: [AuthPageComponent, LoginFormComponent, SignupFormComponent],
  exports: [AuthPageComponent],
  imports: [SharedModule, AuthRoutingModule],
  providers: [SentenceCasePipe, SplitCamelCasePipe],
})
export class AuthModule {}
