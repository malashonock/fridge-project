import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import '@angular/localize/init';

import { EarlyErrorStateMatcher } from 'shared-util-forms';

import { CounterInputComponent } from './counter-input.component';

describe('CounterInputComponent', () => {
  let component: CounterInputComponent;
  let fixture: ComponentFixture<CounterInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterInputComponent, NoopAnimationsModule],
      providers: [EarlyErrorStateMatcher],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
