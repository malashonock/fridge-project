import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';

import { EarlyErrorStateMatcher } from 'core/classes/early-error-state-matcher/early-error-state-matcher.class';
import { GeolocationCoords } from 'core/models/fridge/geolocation-coords.interface';
import { NumberValidators } from 'core/validators/number/number.validators';
import {
  ChangeEventHandler,
  controlHasError,
  getControlError,
  ngValueAccessorProvider,
  valuesLooselyEqual,
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
        null as number | null,
        [
          Validators.required,
          NumberValidators.number,
          Validators.min(-90),
          Validators.max(90),
        ],
      ],
      longitude: [
        null as number | null,
        [
          Validators.required,
          NumberValidators.number,
          Validators.min(-180),
          Validators.max(180),
        ],
      ],
    }),
  });

  private get mapControl(): FormControl {
    return this.form.controls['mapCoords'];
  }

  private get textControls(): FormGroup {
    return this.form.controls['textCoords'];
  }

  private get latitudeControl(): FormControl {
    return this.form.controls['textCoords'].controls['latitude'];
  }

  private get longitudeControl(): FormControl {
    return this.form.controls['textCoords'].controls['longitude'];
  }

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
    this.form
      .get('mapCoords')
      ?.valueChanges.pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((prev, curr): boolean => {
          return (
            prev?.latitude == curr?.latitude &&
            prev?.longitude == curr?.longitude
          );
        })
      )
      .subscribe((value): void => {
        onChangeCallback({
          latitude: value?.latitude || 0,
          longitude: value?.longitude || 0,
        });
      });
  }

  public registerOnTouched(onTouchedCallback: VoidFunction): void {
    this.latitudeInput?.registerOnTouched(onTouchedCallback);
    this.longitudeInput?.registerOnTouched(onTouchedCallback);
  }

  public setDisabledState(isDisabled: boolean): void {
    this.latitudeInput && (this.latitudeInput.disabled = isDisabled);
    this.longitudeInput && (this.longitudeInput.disabled = isDisabled);
  }

  public controlHasError = controlHasError.bind(this.form);
  public getControlError = getControlError.bind(this.form);

  private syncInputs(): void {
    // Text inputs to map input
    this.textControls.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((textControlsValue: Partial<GeolocationCoords>): void => {
        const valueChanged =
          !valuesLooselyEqual(
            this.mapControl.value?.latitude,
            textControlsValue.latitude
          ) ||
          !valuesLooselyEqual(
            this.mapControl.value?.longitude,
            textControlsValue.longitude
          );

        if (!valueChanged || this.textControls.invalid) {
          return;
        }

        this.mapControl.setValue({
          latitude: textControlsValue.latitude || 0,
          longitude: textControlsValue.longitude || 0,
        });
      });

    // Map input to text inputs
    this.mapControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((mapControlValue: GeolocationCoords | null): void => {
        const valueChanged =
          !valuesLooselyEqual(
            this.latitudeControl.value,
            mapControlValue?.latitude
          ) ||
          !valuesLooselyEqual(
            this.longitudeControl.value,
            mapControlValue?.longitude
          );

        if (!valueChanged || this.textControls.invalid) {
          return;
        }

        this.textControls.setValue({
          latitude: mapControlValue?.latitude ?? null,
          longitude: mapControlValue?.longitude ?? null,
        });
      });
  }
}
