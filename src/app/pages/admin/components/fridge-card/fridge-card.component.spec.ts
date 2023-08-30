import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FridgeCardComponent } from './fridge-card.component';
import { SharedModule } from 'shared/shared.module';
import { provideMockStore } from '@ngrx/store/testing';

describe('FridgeCardComponent', () => {
  let component: FridgeCardComponent;
  let fixture: ComponentFixture<FridgeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FridgeCardComponent],
      imports: [SharedModule, HttpClientTestingModule],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(FridgeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
