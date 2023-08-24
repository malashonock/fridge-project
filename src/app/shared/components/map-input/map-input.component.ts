import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import * as L from 'leaflet';

import { GeolocationCoords } from 'core/models/fridge/geolocation-coords.interface';
import {
  ChangeEventHandler,
  ngValueAccessorProvider,
} from 'utils/form/form.utils';

// Fix Leaflet bug
L.Marker.prototype.options.icon = L.icon({
  iconRetinaUrl: 'assets/marker-icon-2x.png',
  iconUrl: 'assets/marker-icon.png',
  shadowUrl: 'assets/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

@Component({
  selector: 'app-map-input',
  templateUrl: './map-input.component.html',
  styleUrls: ['./map-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ngValueAccessorProvider(MapInputComponent)],
})
export class MapInputComponent
  implements ControlValueAccessor, AfterViewInit, OnDestroy
{
  public formControl = new FormControl({
    latitude: 0,
    longitude: 0,
  });

  private map?: L.Map;
  private marker?: L.Marker;

  private get latitude(): number {
    return this.formControl.value?.latitude ?? 0;
  }

  private get longitude(): number {
    return this.formControl.value?.longitude ?? 0;
  }

  private destroy$ = new Subject();

  public constructor(private changeDetector: ChangeDetectorRef) {}

  public ngAfterViewInit(): void {
    this.initMap();
  }

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

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.latitude, this.longitude],
      zoom: 16,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    this.marker = L.marker([this.latitude, this.longitude]).addTo(this.map);
  }
}
