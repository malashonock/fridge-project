import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { of } from 'rxjs';

import { HeaderComponent } from './header.component';
import { UiFacade } from 'private-shared-data-access';

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
      providers: [
        {
          provide: UiFacade,
          useValue: {
            getMobileMode$: () => of(false),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
