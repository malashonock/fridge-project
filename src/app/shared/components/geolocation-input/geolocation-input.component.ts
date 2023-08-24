import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { EarlyErrorStateMatcher } from 'core/classes/early-error-state-matcher/early-error-state-matcher.class';
import { GeolocationCoords } from 'core/models/fridge/geolocation-coords.interface';
import { NumberValidators } from 'core/validators/number/number.validators';
import {
  ChangeEventHandler,
  controlHasError,
  getControlError,
  ngValueAccessorProvider,
} from 'utils/form/form.utils';
import { NumericInputDirective } from 'shared/directives/numeric-input/numeric-input.directive';

@Component({
  selector: 'app-geolocation-input',
  templateUrl: './geolocation-input.component.html',
  styleUrls: ['./geolocation-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    EarlyErrorStateMatcher,
    ngValueAccessorProvider(GeolocationInputComponent),
  ],
})
export class GeolocationInputComponent implements ControlValueAccessor, OnInit {
  public form = this.formBuilder.group({
    latitude: [0, [Validators.required, NumberValidators.number]],
    longitude: [0, [Validators.required, NumberValidators.number]],
  });

  private destroy$ = new Subject();

  @ViewChild('latitudeInput', { read: NumericInputDirective })
  private latitudeInput: NumericInputDirective;

  @ViewChild('longitudeInput', { read: NumericInputDirective })
  private longitudeInput: NumericInputDirective;

  public constructor(
    private formBuilder: FormBuilder,
    public earlyErrorStateMatcher: EarlyErrorStateMatcher
  ) {}

  public ngOnInit(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public writeValue(value: GeolocationCoords): void {
    this.form.setValue({
      latitude: value?.latitude ?? 0,
      longitude: value?.longitude ?? 0,
    });
  }

  public registerOnChange(
    onChangeCallback: ChangeEventHandler<GeolocationCoords>
  ): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ latitude, longitude }): void => {
        onChangeCallback({
          latitude: latitude ?? 0,
          longitude: longitude ?? 0,
        });
      });
  }

  public registerOnTouched(onTouchedCallback: VoidFunction): void {
    // TODO: wire to map interactions
    this.latitudeInput?.registerOnTouched(onTouchedCallback);
    this.longitudeInput?.registerOnTouched(onTouchedCallback);
  }

  public setDisabledState(isDisabled: boolean): void {
    // TODO: disable map interactions
    this.latitudeInput && (this.latitudeInput.disabled = isDisabled);
    this.longitudeInput && (this.longitudeInput.disabled = isDisabled);
  }

  public controlHasError = controlHasError.bind(this.form);
  public getControlError = getControlError.bind(this.form);
}
