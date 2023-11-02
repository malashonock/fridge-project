import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NotificationComponent } from '../../components/notification/notification.component';
import { NotificationSeverity } from '../../types/notification-severity.enum';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public constructor(private snackBar: MatSnackBar) {}

  public broadcastMessage(
    message: string,
    severity: NotificationSeverity = NotificationSeverity.Info,
    duration: number = 3000
  ): void {
    this.snackBar.openFromComponent(NotificationComponent, {
      data: {
        message,
        severity,
      },
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration,
    });
  }
}
