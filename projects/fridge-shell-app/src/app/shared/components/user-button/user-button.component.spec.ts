import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { UserButtonComponent } from './user-button.component';
import { SharedModule } from '@shell/shared/shared.module';

describe('UserButtonComponent', () => {
  let component: UserButtonComponent;
  let fixture: ComponentFixture<UserButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserButtonComponent],
      imports: [SharedModule],
      providers: [
        provideMockStore({
          initialState: {
            auth: undefined,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
