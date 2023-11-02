import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarModule,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NotificationComponent } from './notification.component';
import { NotificationSeverity } from '../../types/notification-severity.enum';
import { NotificationData } from '../../types/notification-data.interface';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  const TEST_DATA: NotificationData = {
    message: 'Test message',
    severity: NotificationSeverity.Info,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationComponent],
      providers: [
        {
          provide: MatSnackBarRef,
          useFactory: (snackBar: MatSnackBar) => {
            return snackBar.openFromComponent(NotificationComponent, {
              data: TEST_DATA,
            });
          },
          deps: [MatSnackBar],
        },
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: TEST_DATA,
        },
      ],
      imports: [
        NoopAnimationsModule,
        MatSnackBarModule,
        MatButtonModule,
        MatIconModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
