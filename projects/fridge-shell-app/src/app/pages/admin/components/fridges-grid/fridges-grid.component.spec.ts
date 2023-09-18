import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from 'fridge-shared-lib';

import { FridgesGridComponent } from './fridges-grid.component';

describe('FridgesGridComponent', () => {
  let component: FridgesGridComponent;
  let fixture: ComponentFixture<FridgesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FridgesGridComponent],
      imports: [MaterialModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FridgesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
