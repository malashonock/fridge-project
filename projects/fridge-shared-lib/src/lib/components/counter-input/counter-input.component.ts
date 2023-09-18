import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatMiniFabButton } from '@angular/material/button';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  concatMap,
  distinctUntilChanged,
  map,
  startWith,
  takeUntil,
} from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

import { EarlyErrorStateMatcher } from '../../classes/early-error-state-matcher/early-error-state-matcher.class';
import { NumberValidators } from '../../validators/number/number.validators';
import { NumericInputDirective } from '../../directives/numeric-input/numeric-input.directive';
import {
  ChangeEventHandler,
  ngValueAccessorProvider,
} from '../../utils/form/form.utils';

@Component({
  selector: 'app-counter-input',
  templateUrl: './counter-input.component.html',
  styleUrls: ['./counter-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ngValueAccessorProvider(CounterInputComponent)],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NumericInputDirective,
  ],
})
export class CounterInputComponent
  implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy
{
  public formControl = new FormControl(
    { value: 0 as number | null, disabled: false },
    [NumberValidators.number, NumberValidators.integer, Validators.min(0)]
  );

  private notifyChangeListener: ChangeEventHandler<number | null> | null = null;

  private valueChanges$ = new BehaviorSubject<number | null>(
    this.formControl.value
  ).pipe(
    concatMap((): Observable<number | null> => {
      return this.formControl.valueChanges;
    })
  );

  public inputDisabled$ = new BehaviorSubject<boolean>(false);

  private lowerBoundHit$ = this.valueChanges$.pipe(
    map((value: number | null): boolean => {
      return (value ?? 0) <= 0;
    }),
    distinctUntilChanged()
  );

  private invalid$ = this.formControl.statusChanges.pipe(
    startWith(this.formControl.status),
    map((): boolean => {
      return this.formControl.invalid;
    }),
    distinctUntilChanged()
  );

  public buttonsDisabled$ = combineLatest([
    this.inputDisabled$,
    this.invalid$,
  ]).pipe(
    map(([inputDisabled, invalid]): boolean => {
      return inputDisabled || invalid;
    }),
    distinctUntilChanged()
  );

  public decrementDisabled$ = combineLatest([
    this.buttonsDisabled$,
    this.lowerBoundHit$,
  ]).pipe(
    map(([buttonsDisabled, lowerBoundHit]): boolean => {
      return buttonsDisabled || lowerBoundHit;
    }),
    distinctUntilChanged()
  );

  private destroy$ = new Subject();

  @ViewChild('counterInput') private input: ElementRef;

  @ViewChild(NumericInputDirective, { static: true })
  private inputDirective: NumericInputDirective;

  @ViewChild('incrementBtn', { read: MatMiniFabButton })
  private incrementBtn: MatMiniFabButton;

  @ViewChild('decrementBtn', { read: MatMiniFabButton })
  private decrementBtn: MatMiniFabButton;

  public constructor(public earlyErrorStateMatcher: EarlyErrorStateMatcher) {}

  public ngOnInit(): void {
    this.valueChanges$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: number | null): void => {
        this.notifyChangeListener?.(value);
      });
  }

  public ngAfterViewInit(): void {
    this.inputDisabled$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isDisabled: boolean): void => {
        this.inputDirective.disabled = isDisabled;
      });

    this.buttonsDisabled$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isDisabled: boolean): void => {
        this.incrementBtn.disabled = isDisabled;
      });

    this.decrementDisabled$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isDisabled: boolean): void => {
        this.decrementBtn.disabled = isDisabled;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public writeValue(value: number): void {
    this.formControl.setValue(value);
  }

  public registerOnChange(
    onChangeCallback: ChangeEventHandler<number | string | null>
  ): void {
    this.notifyChangeListener = onChangeCallback;
  }

  public registerOnTouched(onTouchedCallback: VoidFunction): void {
    this.inputDirective.registerOnTouched(onTouchedCallback);
  }

  public setDisabledState(isDisabled: boolean): void {
    this.inputDisabled$.next(isDisabled);
  }

  public increment(): void {
    this.formControl.setValue((this.formControl.value ?? 0) + 1);
  }

  public decrement(): void {
    this.formControl.setValue((this.formControl.value ?? 0) - 1);
  }

  public focus(): void {
    this.input?.nativeElement.select();
    this.input?.nativeElement.scrollIntoView();
  }
}
