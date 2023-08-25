import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import '@angular/localize/init';

import { GeolocationInputComponent } from './geolocation-input.component';
import { MapInputComponent } from '../map-input/map-input.component';
import { SharedModule } from 'shared/shared.module';
import { EarlyErrorStateMatcher } from 'core/classes/early-error-state-matcher/early-error-state-matcher.class';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('GeolocationInputComponent', () => {
  let component: GeolocationInputComponent;
  let fixture: ComponentFixture<GeolocationInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeolocationInputComponent, MapInputComponent],
      imports: [SharedModule, NoopAnimationsModule, ReactiveFormsModule],
      providers: [EarlyErrorStateMatcher],
    }).compileComponents();

    fixture = TestBed.createComponent(GeolocationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
