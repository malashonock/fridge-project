import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

import { GeolocationCoords } from '../../models/geolocation-coords.interface';

@Injectable({
  providedIn: 'root',
})
export class NavigatorService {
  public getUserLocation(): Observable<GeolocationCoords> {
    return new Observable((subscriber: Subscriber<GeolocationCoords>): void => {
      if (!('geolocation' in navigator)) {
        subscriber.error(new Error('Geolocation API is not available'));
      }

      navigator.geolocation.getCurrentPosition(
        function onSuccess({ coords }: GeolocationPosition) {
          const { latitude, longitude } = coords;

          subscriber.next({
            latitude,
            longitude,
          });

          subscriber.complete();
        },
        function onError(error: GeolocationPositionError) {
          subscriber.error(error);
        }
      );
    });
  }
}
