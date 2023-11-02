import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationComponent } from '../../components/notification/notification.component';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationComponent],
      imports: [MatSnackBarModule],
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
