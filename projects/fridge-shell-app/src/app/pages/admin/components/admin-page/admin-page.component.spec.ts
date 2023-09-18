import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import '@angular/localize/init';

import { MaterialModule } from 'fridge-shared-lib';

import { AdminPageComponent } from './admin-page.component';
import { adminPageMenuConfigProvider } from '../../configs/admin-page-menu.config';

describe('AdminPageComponent', () => {
  let component: AdminPageComponent;
  let fixture: ComponentFixture<AdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPageComponent],
      imports: [MaterialModule, BrowserAnimationsModule, RouterTestingModule],
      providers: [provideMockStore(), adminPageMenuConfigProvider],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
