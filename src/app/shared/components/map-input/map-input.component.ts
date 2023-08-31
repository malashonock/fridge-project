import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import * as L from 'leaflet';

import { GeolocationCoords } from 'core/models/fridge/geolocation-coords.interface';
import {
  ChangeEventHandler,
  ngValueAccessorProvider,
} from 'utils/form/form.utils';

const MAX_COORDS_PRECISION = 5; // decimal places

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
  } as GeolocationCoords | null);

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
    this.registerOnMapDrag();
    this.registerOnMapDragEnd();
    this.registerOnMapZoomEnd();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public writeValue(value: GeolocationCoords | null): void {
    const latitude = value?.latitude ?? 0;
    const longitude = value?.longitude ?? 0;

    this.formControl.setValue({
      latitude,
      longitude,
    });

    this.marker?.setLatLng([latitude, longitude]);
    this.map?.setView([latitude, longitude]);
    this.changeDetector.detectChanges();
  }

  public registerOnChange(
    onChangeCallback: ChangeEventHandler<GeolocationCoords>
  ): void {
    this.formControl.valueChanges
      .pipe(
        distinctUntilChanged((prev, curr): boolean => {
          return (
            prev?.latitude == curr?.latitude &&
            prev?.longitude == curr?.longitude
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((value): void => {
        onChangeCallback({
          latitude: value?.latitude ?? 0,
          longitude: value?.longitude ?? 0,
        });
      });
  }

  public registerOnTouched(onTouchedCallback: VoidFunction): void {
    this.map?.on('moveend', (): void => {
      onTouchedCallback();
    });
  }

  public setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.map?.dragging.disable() : this.map?.dragging.enable();
  }

  private initMap(): void {
    // Create an empty map
    this.map = L.map('map', {
      center: [this.latitude, this.longitude],
      zoom:
        !this.formControl.value || (this.latitude === 0 && this.longitude === 0)
          ? 2
          : 16,
      minZoom: 1,
      scrollWheelZoom: 'center',
      touchZoom: 'center',
    });

    // Draw the OpenStreetMap layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    // Create the location marker
    this.marker = L.marker([this.latitude, this.longitude]).addTo(this.map);
  }

  private registerOnMapDrag(): void {
    this.map?.on('move', (event: L.LeafletEvent): void => {
      // Abort if not a drag event
      if (
        !Object.hasOwn(event, 'originalEvent') ||
        (event as L.LeafletMouseEvent).originalEvent.type !== 'mousemove'
      ) {
        return;
      }

      if (!this.map || !this.marker) {
        return;
      }

      const { lat, lng } = this.map.getCenter();

      this.marker.setLatLng([
        Number(lat.toFixed(MAX_COORDS_PRECISION)),
        Number(lng.toFixed(MAX_COORDS_PRECISION)),
      ]);
    });
  }

  private registerOnMapDragEnd(): void {
    this.map?.on('moveend', (event: L.LeafletEvent): void => {
      // Abort if not a drag event
      if (!event.target.dragging?.moved?.()) {
        return;
      }

      if (!this.marker) {
        return;
      }

      const { lat, lng } = this.marker.getLatLng();

      this.formControl.setValue({
        latitude: lat,
        longitude: lng,
      });
    });
  }

  private registerOnMapZoomEnd(): void {
    this.map?.on('zoomend', (): void => {
      if (!this.map || !this.marker) {
        return;
      }

      // Leaflet scrolling isn't centered precisely,
      // so need to fine-tune map position after zoom
      this.map.panTo(this.marker.getLatLng());
    });
  }
}
