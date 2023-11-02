import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EffectsModule } from '@ngrx/effects';

import { NotificationService } from './services/notification/notification.service';
import { NotificationComponent } from './components/notification/notification.component';
import { AuthNotificationEffects } from './state/auth-notification.effects';
import { ProductsNotificationEffects } from './state/products-notification.effects';
import { FridgesNotificationEffects } from './state/fridges-notification.effects';

const materialModules = [MatSnackBarModule, MatButtonModule, MatIconModule];

@NgModule({
  providers: [NotificationService],
  declarations: [NotificationComponent],
  imports: [
    materialModules,
    EffectsModule.forFeature([
      AuthNotificationEffects,
      ProductsNotificationEffects,
      FridgesNotificationEffects,
    ]),
  ],
})
export class SharedFeatureNotificationsModule {}
