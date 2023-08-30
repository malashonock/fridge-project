import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgesMapComponent } from './fridges-map.component';

describe('FridgesMapComponent', () => {
  let component: FridgesMapComponent;
  let fixture: ComponentFixture<FridgesMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FridgesMapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FridgesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
