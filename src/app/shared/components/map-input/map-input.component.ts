import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { GeolocationCoords } from 'core/models/fridge/geolocation-coords.interface';
import {
  ChangeEventHandler,
  ngValueAccessorProvider,
} from 'utils/form/form.utils';

@Component({
  selector: 'app-map-input',
  templateUrl: './map-input.component.html',
  styleUrls: ['./map-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ngValueAccessorProvider(MapInputComponent)],
})
export class MapInputComponent implements ControlValueAccessor, OnDestroy {
  public formControl = new FormControl({
    latitude: 0,
    longitude: 0,
  });

  private destroy$ = new Subject();

  public constructor(private changeDetector: ChangeDetectorRef) {}

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public writeValue(value: GeolocationCoords): void {
    this.formControl.setValue({
      latitude: value.latitude,
      longitude: value.longitude,
    });

    this.changeDetector.detectChanges();
  }

  public registerOnChange(
    onChangeCallback: ChangeEventHandler<GeolocationCoords>
  ): void {
    this.formControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value): void => {
        onChangeCallback({
          latitude: value?.latitude ?? 0,
          longitude: value?.longitude ?? 0,
        });
      });
  }

  public registerOnTouched(onTouchedCallback: VoidFunction): void {
    // TODO: wire to map interactions
  }

  public setDisabledState(isDisabled: boolean): void {
    // TODO: disable map interactions
  }
}
