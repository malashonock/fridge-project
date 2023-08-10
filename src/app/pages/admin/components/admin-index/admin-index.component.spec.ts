import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminIndexComponent } from './admin-index.component';
import { adminPageMenuConfigProvider } from 'core/configs';
import { SharedModule } from 'shared/shared.module';

describe('AdminIndexComponent', () => {
  let component: AdminIndexComponent;
  let fixture: ComponentFixture<AdminIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminIndexComponent],
      imports: [SharedModule, RouterTestingModule],
      providers: [adminPageMenuConfigProvider],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
