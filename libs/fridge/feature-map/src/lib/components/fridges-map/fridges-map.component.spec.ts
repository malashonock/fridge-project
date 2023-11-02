import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import '@angular/localize/init';

import { FridgeFacade } from 'fridge-data-access';
import 'jest-global-mocks';

import { FridgesMapComponent } from './fridges-map.component';

describe('FridgesMapComponent', () => {
  let component: FridgesMapComponent;
  let fixture: ComponentFixture<FridgesMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FridgesMapComponent],
      providers: [
        {
          provide: FridgeFacade,
          useValue: {
            getAllFridges$: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FridgesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
