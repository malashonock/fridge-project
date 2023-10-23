import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthService } from './services/auth.service';
import { provideAuthSessionInitializer } from './initializers/auth-session.initializer';
import { provideUserRoles } from './config/user-roles.config';
import { provideAuthInterceptor } from './interceptors/auth.interceptor';
import { authFeature } from './state/auth.feature';
import { AuthEffects } from './state/auth.effects';

@NgModule({
  providers: [
    AuthService,
    provideAuthSessionInitializer(),
    provideAuthInterceptor(),
    provideUserRoles(),
  ],
  imports: [
    StoreModule.forFeature(authFeature.name, authFeature.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class UserDataAccessModule {}
