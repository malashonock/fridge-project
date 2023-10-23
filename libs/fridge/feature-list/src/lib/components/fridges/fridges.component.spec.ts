import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import '@angular/localize/init';

import { AnyPipe, MaterialModule, OrPipe, SearchBoxComponent } from 'shared-ui';

import { FridgesComponent } from './fridges.component';
import { FridgesGridComponent } from '../fridges-grid/fridges-grid.component';

describe('FridgesComponent', () => {
  let component: FridgesComponent;
  let fixture: ComponentFixture<FridgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FridgesComponent, FridgesGridComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        AnyPipe,
        OrPipe,
        SearchBoxComponent,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(FridgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
