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
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-fridges-map',
  templateUrl: './fridges-map.component.html',
  styleUrls: ['./fridges-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FridgesMapComponent implements OnInit, OnDestroy {
  private map?: L.Map;
  private userLocation?: GeolocationCoords;
  private markers: L.Marker[] = [];

  private destroy$ = new Subject();

  public constructor(private store: Store) {}

  public ngOnInit(): void {
    this.initMap();
    this.subscribeMarkersToStoreFridges();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
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

  private initMap(): void {
    // Create an empty map
    this.map = L.map('map', {
      center: [
        this.userLocation?.latitude ?? 0,
        this.userLocation?.longitude ?? 0,
      ],
      zoom: this.userLocation ? 16 : 2,
      minZoom: 2,
    });

    // Draw the OpenStreetMap layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
  }
}
