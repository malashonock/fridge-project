import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Inject,
} from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

import { NotificationData } from '../../types/notification-data.interface';

@Component({
  selector: 'lib-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  @HostBinding('attr.severity')
  public severity = this.data.severity;

  public constructor(
    private snackBarRef: MatSnackBarRef<NotificationComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationData
  ) {}

  @HostListener('document:keyup.escape')
  public dismiss(): void {
    this.snackBarRef.dismissWithAction();
  }
}
