import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSidenavModule } from '@angular/material/sidenav';

import { LayoutComponent } from './layout.component';

@Component({
  selector: 'app-header',
})
class TestHeaderComponent {}

@Component({
  selector: 'app-user-button',
})
class TestUserButtonComponent {}

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LayoutComponent,
        TestHeaderComponent,
        TestUserButtonComponent,
      ],
      imports: [NoopAnimationsModule, RouterTestingModule, MatSidenavModule],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
