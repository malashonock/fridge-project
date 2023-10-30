import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import '@angular/localize/init';

import { MaterialModule, MenuItemComponent } from 'shared-ui';

import { AdminIndexComponent } from './admin-index.component';
import { adminPageMenuConfigProvider } from '../../configs/admin-page-menu.config';

describe('AdminIndexComponent', () => {
  let component: AdminIndexComponent;
  let fixture: ComponentFixture<AdminIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminIndexComponent],
      imports: [MaterialModule, RouterTestingModule, MenuItemComponent],
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
