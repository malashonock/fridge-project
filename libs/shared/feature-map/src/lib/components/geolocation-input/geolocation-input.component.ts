import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';

import {
  EarlyErrorStateMatcher,
  NumberValidators,
  ChangeEventHandler,
  controlHasError,
  getControlError,
  ngValidatorsProvider,
  ngValueAccessorProvider,
} from 'shared-util-forms';
import { NumericInputDirective } from 'shared-ui';

import { GeolocationCoords } from '../../models/geolocation-coords.interface';
import { MapInputComponent } from '../map-input/map-input.component';
import { CommonModule } from '@angular/common';

const materialModules = [MatFormFieldModule];

@Component({
  selector: 'lib-geolocation-input',
  templateUrl: './geolocation-input.component.html',
  styleUrls: ['./geolocation-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    EarlyErrorStateMatcher,
    ngValueAccessorProvider(GeolocationInputComponent),
    ngValidatorsProvider(GeolocationInputComponent),
  ],
  standalone: true,
  imports: [
    CommonModule,
    MapInputComponent,
    NumericInputDirective,
    ReactiveFormsModule,
    materialModules,
  ],
})
export class GeolocationInputComponent
  implements ControlValueAccessor, Validator, OnInit, OnDestroy
{
  @Input() public id = '';

  public form = this.formBuilder.nonNullable.group({
    mapCoords: [null as GeolocationCoords | null, [Validators.required]],
    textCoords: this.formBuilder.nonNullable.group({
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

  public controlHasError = controlHasError.bind(this.form);
  public getControlError = getControlError.bind(this.form);

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
    onChangeCallback: ChangeEventHandler<GeolocationCoords | null>
  ): void {
    this.mapControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((prev, curr): boolean => {
          return (
            prev?.latitude == curr?.latitude &&
            prev?.longitude == curr?.longitude
          );
        })
      )
      .subscribe((value: GeolocationCoords | null): void => {
        onChangeCallback(
          value && this.textControls.valid
            ? {
                latitude: value?.latitude,
                longitude: value?.longitude,
              }
            : null
        );
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

  public validate(): ValidationErrors | null {
    return this.form.valid
      ? null
      : {
          mapControl: this.mapControl.errors
            ? { ...this.mapControl.errors }
            : null,
          textControls: {
            latitude: this.latitudeControl.errors
              ? { ...this.latitudeControl.errors }
              : null,
            longitude: this.longitudeControl.errors
              ? { ...this.longitudeControl.errors }
              : null,
          },
        };
  }

  public registerOnValidatorChange(
    onValidatorChangedCallback: VoidFunction
  ): void {
    this.form.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((): void => {
        onValidatorChangedCallback();
      });
  }

  private syncInputs(): void {
    // Text inputs to map input
    this.textControls.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((textControlsValue: Partial<GeolocationCoords>): void => {
        const valueChanged =
          this.mapControl.value?.latitude != textControlsValue.latitude ||
          this.mapControl.value?.longitude != textControlsValue.longitude;

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
          this.latitudeControl.value != mapControlValue?.latitude ||
          this.longitudeControl.value != mapControlValue?.longitude;

        if (!valueChanged) {
          return;
        }

        this.textControls.setValue({
          latitude: mapControlValue?.latitude ?? null,
          longitude: mapControlValue?.longitude ?? null,
        });
      });
  }
}
