import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import '@angular/localize/init';

import { MaterialModule, mockFridge1 } from 'fridge-shared-lib';

import { FridgeCardComponent } from './fridge-card.component';

describe('FridgeCardComponent', () => {
  let component: FridgeCardComponent;
  let fixture: ComponentFixture<FridgeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FridgeCardComponent],
      imports: [MaterialModule, HttpClientTestingModule],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(FridgeCardComponent);
    component = fixture.componentInstance;
    component.fridge = mockFridge1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
