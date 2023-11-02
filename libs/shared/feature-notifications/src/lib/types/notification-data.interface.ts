import { NotificationSeverity } from './notification-severity.enum';

export interface NotificationData {
  message: string;
  severity: NotificationSeverity;
}
