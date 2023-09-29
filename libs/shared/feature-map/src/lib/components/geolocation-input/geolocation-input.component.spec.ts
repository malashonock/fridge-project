import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import '@angular/localize/init';

import { EarlyErrorStateMatcher } from 'shared-util-forms';
import { NumericInputDirective } from 'shared-ui';

import { GeolocationInputComponent } from './geolocation-input.component';
import { MapInputComponent } from '../map-input/map-input.component';

describe('GeolocationInputComponent', () => {
  let component: GeolocationInputComponent;
  let fixture: ComponentFixture<GeolocationInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        GeolocationInputComponent,
        MapInputComponent,
        CommonModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        NumericInputDirective,
      ],
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
