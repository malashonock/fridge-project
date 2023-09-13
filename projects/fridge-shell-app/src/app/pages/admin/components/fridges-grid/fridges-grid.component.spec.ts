import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgesGridComponent } from './fridges-grid.component';
import { SharedModule } from '@shell/shared/shared.module';

describe('FridgesGridComponent', () => {
  let component: FridgesGridComponent;
  let fixture: ComponentFixture<FridgesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FridgesGridComponent],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FridgesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
