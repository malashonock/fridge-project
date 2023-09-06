import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import '@angular/localize/init';

import { FridgesMapComponent } from './fridges-map.component';

describe('FridgesMapComponent', () => {
  let component: FridgesMapComponent;
  let fixture: ComponentFixture<FridgesMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FridgesMapComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(FridgesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
