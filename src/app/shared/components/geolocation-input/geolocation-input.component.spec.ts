import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocationInputComponent } from './geolocation-input.component';

describe('GeolocationInputComponent', () => {
  let component: GeolocationInputComponent;
  let fixture: ComponentFixture<GeolocationInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeolocationInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeolocationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
