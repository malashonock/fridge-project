import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CounterInputComponent } from './counter-input.component';
import { EarlyErrorStateMatcher } from 'core/classes/early-error-state-matcher/early-error-state-matcher.class';

describe('CounterInputComponent', () => {
  let component: CounterInputComponent;
  let fixture: ComponentFixture<CounterInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterInputComponent],
      imports: [SharedModule, NoopAnimationsModule],
      providers: [
        { provide: EarlyErrorStateMatcher, useClass: EarlyErrorStateMatcher },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
