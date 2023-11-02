import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NotificationComponent } from './components/notification/notification.component';

const materialModules = [MatSnackBarModule, MatButtonModule, MatIconModule];

@NgModule({
  declarations: [NotificationComponent],
  imports: [materialModules],
})
export class SharedFeatureNotificationsModule {}
