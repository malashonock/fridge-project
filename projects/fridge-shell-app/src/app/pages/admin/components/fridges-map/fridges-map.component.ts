import {
  AfterViewInit,
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Subject,
  debounce,
  skip,
  take,
  takeUntil,
} from 'rxjs';

import {
  GeolocationCoords,
  Fridge,
  selectAllFridges,
  NavigatorService,
} from 'fridge-shared-lib';

import { FridgeCardComponent } from '../fridge-card/fridge-card.component';

interface FridgeMarker {
  fridge: Fridge;
  marker: L.Marker;
  popup?: L.Popup;
  fridgeCard?: ComponentRef<FridgeCardComponent>;
}

const LEAFLET_POPUP_TRANSITION_DURATION = 200; // ms

@Component({
  selector: 'app-fridges-map',
  templateUrl: './fridges-map.component.html',
  styleUrls: ['./fridges-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FridgesMapComponent implements OnInit, AfterViewInit, OnDestroy {
  private map?: L.Map;
  private fridgeMarkers: FridgeMarker[] = [];

  private userLocation$ = new BehaviorSubject<GeolocationCoords>({
    latitude: 0,
    longitude: 0,
  });

  private destroy$ = new Subject();

  @ViewChild('map') private mapContainer: ElementRef;
  private mapContainerObserver = new ResizeObserver(() => {
    this.map?.invalidateSize();
  });

  public constructor(
    private store: Store,
    private navigatorService: NavigatorService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  public ngOnInit(): void {
    this.initUserLocation();
    this.initMap();
    this.subscribeToUserLocationChanges();
    this.subscribeMarkersToStoreFridges();
  }

  public ngAfterViewInit(): void {
    this.mapContainerObserver.observe(this.mapContainer.nativeElement);
  }

  public ngOnDestroy(): void {
    this.mapContainerObserver.unobserve(this.mapContainer.nativeElement);
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
        this.map = L.map('fridges-map', {
          center: [latitude, longitude],
          zoom: 2,
          minZoom: 2,
        });

        this.map.on('keydown', (event: L.LeafletKeyboardEvent) => {
          if (event.originalEvent.key === 'Escape') {
            this.map?.closePopup();
          }
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
      .pipe(skip(1) /* Skip initial value */, takeUntil(this.destroy$))
      .subscribe(({ latitude, longitude }: GeolocationCoords): void => {
        // Pan and zoom map to user location
        this.map?.flyTo([latitude, longitude], 12);
      });
  }

  private subscribeMarkersToStoreFridges(): void {
    this.store
      .select(selectAllFridges)
      .pipe(
        debounce(async (): Promise<void[]> => await this.closeAllPopups()),
        takeUntil(this.destroy$)
      )
      .subscribe(async (fridges: Fridge[]): Promise<void> => {
        this.destroyFridgeMarkers();
        this.createFridgeMarkers(fridges);
      });
  }

  private createFridgeMarkers(fridges: Fridge[]): void {
    if (!this.map) {
      return;
    }

    fridges.forEach((fridge: Fridge): void => {
      const { latitude, longitude } = fridge.geolocation;

      // Create marker
      const marker = L.marker([latitude, longitude]).addTo(this.map!);
      const fridgeMarker: FridgeMarker = {
        fridge,
        marker,
      };

      // Bind popup
      const popup = L.popup({
        closeButton: false,
      });
      fridgeMarker.popup = popup;
      popup.on('add', () => this.createEmbeddedFridgeCard(fridgeMarker));
      popup.on('remove', () =>
        setTimeout(() => {
          this.destroyEmbeddedFridgeCard(fridgeMarker);
        }, LEAFLET_POPUP_TRANSITION_DURATION)
      );
      marker.bindPopup(popup);

      this.fridgeMarkers.push(fridgeMarker);
    });
  }

  private destroyFridgeMarkers(): void {
    this.fridgeMarkers.forEach(({ marker }: FridgeMarker): void => {
      marker.remove();
    });

    this.fridgeMarkers = [];
  }

  private createEmbeddedFridgeCard(fridgeMarker: FridgeMarker): void {
    const { fridge, popup } = fridgeMarker;

    if (!popup) {
      return;
    }

    // Create fridge card
    const fridgeCardFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        FridgeCardComponent
      );
    const fridgeCard = fridgeCardFactory.create(this.injector);
    fridgeMarker.fridgeCard = fridgeCard;

    // Initialize fridge card inputs
    fridgeCard.instance.fridge = fridge;

    // Wire up to Angular app
    this.appRef.attachView(fridgeCard.hostView);

    // Place fridge card inside popup
    popup.setContent(fridgeCard.location.nativeElement);
  }

  private destroyEmbeddedFridgeCard(fridgeMarker: FridgeMarker): void {
    const { fridgeCard } = fridgeMarker;

    if (!fridgeCard) {
      return;
    }

    // Clean up resources
    this.appRef.detachView(fridgeCard.hostView);
    delete fridgeMarker.fridgeCard;
    fridgeCard.destroy();
  }

  private async closeAllPopups(): Promise<void[]> {
    return Promise.all(
      this.fridgeMarkers
        .map(({ popup }: FridgeMarker): L.Popup | undefined => {
          return popup;
        })
        .filter((popup: L.Popup | undefined): boolean => {
          return popup?.isOpen() ?? false;
        })
        .map((popup: L.Popup | undefined): Promise<void> => {
          return new Promise((resolve, reject) => {
            try {
              popup!.close();
              setTimeout(resolve, LEAFLET_POPUP_TRANSITION_DURATION);
            } catch (error) {
              reject(error);
            }
          });
        })
    );
  }
}
