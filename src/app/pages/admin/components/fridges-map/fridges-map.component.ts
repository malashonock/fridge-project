import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import * as L from 'leaflet';

import { GeolocationCoords } from 'core/models/fridge/geolocation-coords.interface';
import { Store } from '@ngrx/store';
import { selectAllFridges } from 'app/state/fridges/fridges.selectors';
import { Fridge } from 'core/models/fridge/fridge.interface';
import { BehaviorSubject, Subject, skip, take, takeUntil } from 'rxjs';
import { NavigatorService } from 'core/services/navigator/navigator.service';

@Component({
  selector: 'app-fridges-map',
  templateUrl: './fridges-map.component.html',
  styleUrls: ['./fridges-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FridgesMapComponent implements OnInit, OnDestroy {
  private map?: L.Map;
  private markers: L.Marker[] = [];

  private userLocation$ = new BehaviorSubject<GeolocationCoords>({
    latitude: 0,
    longitude: 0,
  });

  private destroy$ = new Subject();

  public constructor(
    private store: Store,
    private navigatorService: NavigatorService
  ) {}

  public ngOnInit(): void {
    this.initUserLocation();
    this.initMap();
    this.subscribeToUserLocationChanges();
    this.subscribeMarkersToStoreFridges();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private initUserLocation(): void {
    this.navigatorService
      .getUserLocation()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (coords: GeolocationCoords): void => {
          this.userLocation$.next(coords);
        },
        error: (error: Error): void => {
          console.error(error.message);
        },
      });
  }

  private initMap(): void {
    this.userLocation$
      .pipe(take(1))
      .subscribe(({ latitude, longitude }: GeolocationCoords): void => {
        // Create an empty map
        this.map = L.map('map', {
          center: [latitude, longitude],
          zoom: 2,
          minZoom: 2,
        });

        // Draw the OpenStreetMap layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.map);
      });
  }

  private subscribeToUserLocationChanges(): void {
    this.userLocation$
      .pipe(takeUntil(this.destroy$), skip(1) /* Skip initial value */)
      .subscribe(({ latitude, longitude }: GeolocationCoords): void => {
        // Pan and zoom map to user location
        this.map?.flyTo([latitude, longitude], 12);
      });
  }

  private subscribeMarkersToStoreFridges(): void {
    this.store
      .select(selectAllFridges)
      .pipe(takeUntil(this.destroy$))
      .subscribe((fridges: Fridge[]): void => {
        if (!this.map) {
          return;
        }

        this.markers = [];

        fridges.forEach((fridge: Fridge): void => {
          const { latitude, longitude } = fridge.geolocation;
          const marker = L.marker([latitude, longitude]).addTo(this.map!);
          this.markers.push(marker);
        });
      });
  }
}
