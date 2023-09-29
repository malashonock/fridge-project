import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthService } from './services/auth.service';
import { AuthSessionInitializer } from './initializers/auth-session.initializer';
import { userRolesProvider } from './config/user-roles.config';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { authFeature } from './state/auth.feature';
import { AuthEffects } from './state/auth.effects';

@NgModule({
  providers: [
    AuthService,
    AuthSessionInitializer,
    userRolesProvider,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  imports: [
    StoreModule.forFeature(authFeature.name, authFeature.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class UserDataAccessModule {}
