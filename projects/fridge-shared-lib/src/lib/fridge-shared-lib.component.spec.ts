import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeSharedLibComponent } from './fridge-shared-lib.component';

describe('FridgeSharedLibComponent', () => {
  let component: FridgeSharedLibComponent;
  let fixture: ComponentFixture<FridgeSharedLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FridgeSharedLibComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FridgeSharedLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
