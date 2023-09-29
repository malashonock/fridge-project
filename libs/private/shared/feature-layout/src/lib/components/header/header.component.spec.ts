import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HeaderComponent } from './header.component';

@Component({
  selector: 'lib-logo',
})
class TestLogoComponent {}

@Component({
  selector: 'lib-user-button',
})
class TestUserButtonComponent {}

@Component({
  selector: 'lib-burger-button',
})
class TestBurgerButtonComponent {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        TestLogoComponent,
        TestUserButtonComponent,
        TestBurgerButtonComponent,
      ],
      imports: [RouterTestingModule, MatToolbarModule],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
