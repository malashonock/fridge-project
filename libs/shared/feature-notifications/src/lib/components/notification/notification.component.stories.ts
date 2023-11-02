import { Component, Input, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  type Meta,
  type StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { NotificationSeverity } from '../../types/notification-severity.enum';
import { NotificationService } from '../../services/notification/notification.service';
import { SharedFeatureNotificationsModule } from '../../shared-feature-notifications.module';

@Component({
  selector: 'lib-test-host',
  template: '<button (click)="showNotification()">Open notification</button>',
})
class TestHostComponent {
  @Input() public message = 'Test message';
  @Input() public severity = NotificationSeverity.Info;
  @Input() public duration: number | undefined;

  public constructor(private notificationService: NotificationService) {}

  public showNotification(): void {
    this.notificationService.broadcastMessage(
      this.message,
      this.severity,
      this.duration
    );
  }
}

const meta: Meta<TestHostComponent> = {
  component: TestHostComponent,
  title: 'NotificationComponent',
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        NotificationService,
        importProvidersFrom(SharedFeatureNotificationsModule),
      ],
    }),
  ],
  argTypes: {
    severity: {
      options: [
        NotificationSeverity.Info,
        NotificationSeverity.Warning,
        NotificationSeverity.Error,
      ],
      control: {
        type: 'select',
        labels: {
          [NotificationSeverity.Info]: 'NotificationSeverity.Info',
          [NotificationSeverity.Warning]: 'NotificationSeverity.Warning',
          [NotificationSeverity.Error]: 'NotificationSeverity.Error',
        },
      },
    },
  },
};
export default meta;
type Story = StoryObj<TestHostComponent>;

export const Info: Story = {
  args: {
    message: 'This is a neutral message',
    severity: NotificationSeverity.Info,
  },
};

export const Warning: Story = {
  args: {
    message: 'This is a warning message',
    severity: NotificationSeverity.Warning,
  },
};

export const Error: Story = {
  args: {
    message: 'This is an error message',
    severity: NotificationSeverity.Error,
  },
};
