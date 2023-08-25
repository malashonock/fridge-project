import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
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
export class GeolocationInputComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  public form = this.formBuilder.group({
    mapCoords: [null as GeolocationCoords | null],
    textCoords: this.formBuilder.group({
      latitude: [
        0 as number | null,
        [Validators.required, NumberValidators.number],
      ],
      longitude: [
        0 as number | null,
        [Validators.required, NumberValidators.number],
      ],
    }),
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
    this.syncInputs();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public writeValue(value: GeolocationCoords | null): void {
    this.form.setValue({
      mapCoords: value,
      textCoords: {
        latitude: value?.latitude ?? null,
        longitude: value?.longitude ?? null,
      },
    });
  }

  public registerOnChange(
    onChangeCallback: ChangeEventHandler<GeolocationCoords>
  ): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value): void => {
        onChangeCallback({
          latitude: value.textCoords?.latitude || 0,
          longitude: value.textCoords?.longitude || 0,
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

  private syncInputs(): void {
    // Text inputs to map input
    this.form
      .get('textCoords')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value): void => {
        const mapCoords = this.form.get('mapCoords');

        if (!mapCoords) {
          return;
        }

        const valueChanged =
          mapCoords.value?.latitude !== value.latitude ||
          mapCoords.value?.longitude !== value.longitude;

        if (!valueChanged) {
          return;
        }

        mapCoords.setValue({
          latitude: value.latitude || 0,
          longitude: value.longitude || 0,
        });
      });

    // Map input to text inputs
    this.form
      .get('mapCoords')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value): void => {
        const latitudeTextInput = this.form.get('textCoords.latitude');
        const longitudeTextInput = this.form.get('textCoords.longitude');

        if (!latitudeTextInput || !longitudeTextInput) {
          return;
        }

        const valueChanged =
          latitudeTextInput.value !== value?.latitude ||
          longitudeTextInput.value !== value?.longitude;

        if (!valueChanged) {
          return;
        }

        latitudeTextInput.setValue(value?.latitude ?? 0, { emitEvent: false });
        longitudeTextInput.setValue(value?.longitude ?? 0);
      });
  }
}
