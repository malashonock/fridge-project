import { ComponentFixture, TestBed } from '@angular/core/testing';
import '@angular/localize/init';

import { AnyPipe, MaterialModule } from 'shared-ui';

import { FridgesGridComponent } from './fridges-grid.component';

describe('FridgesGridComponent', () => {
  let component: FridgesGridComponent;
  let fixture: ComponentFixture<FridgesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FridgesGridComponent],
      imports: [MaterialModule, AnyPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(FridgesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
