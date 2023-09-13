import { TestBed } from '@angular/core/testing';

import { NavigatorService } from './navigator.service';
import { GeolocationCoords } from '@shell/core/models/fridge/geolocation-coords.interface';

describe('NavigatorService', () => {
  let service: NavigatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUserLocation() method', () => {
    it('given Geolocation API is not available, should throw error', (done) => {
      const spyOnSuccessCallback = jest.fn();
      const spyOnCompleteCallback = jest.fn();

      service.getUserLocation().subscribe({
        next: spyOnSuccessCallback,
        error: (error: Error): void => {
          expect(error.message).toBe('Geolocation API is not available');
          expect(spyOnSuccessCallback).not.toHaveBeenCalled();
          expect(spyOnCompleteCallback).not.toHaveBeenCalled();
          done();
        },
        complete: spyOnCompleteCallback,
      });
    });

    describe('given Geolocation API is available', () => {
      const originalGeolocationAPI = global.navigator.geolocation;

      afterEach(() => {
        Object.defineProperty(global.navigator, 'geolocation', {
          writable: false,
          value: originalGeolocationAPI,
        });
      });

      it('given user agent detected the coordinates, should push them to subscribers and complete', (done) => {
        const mockCoords: GeolocationCoordinates = {
          latitude: 53,
          longitude: 27,
          accuracy: 0,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        };

        Object.defineProperty(global.navigator, 'geolocation', {
          value: {
            getCurrentPosition: (onSuccess: PositionCallback) => {
              onSuccess({
                timestamp: Date.now(),
                coords: mockCoords,
              });
            },
          },
        });

        const spyOnErrorCallback = jest.fn();

        service.getUserLocation().subscribe({
          next: ({ latitude, longitude }: GeolocationCoords): void => {
            expect(latitude).toBe(mockCoords.latitude);
            expect(longitude).toBe(mockCoords.longitude);
          },
          error: spyOnErrorCallback,
          complete: (): void => {
            expect(spyOnErrorCallback).not.toHaveBeenCalled();
            done();
          },
        });
      });

      it('given Geolocation API throws an error, should rethrow it to subscribers', (done) => {
        Object.defineProperty(global.navigator, 'geolocation', {
          value: {
            getCurrentPosition: (
              onSuccess: PositionCallback,
              onError: (error: Error) => void
            ) => {
              onError(new Error('Test error'));
            },
          },
        });

        const spyOnNextCallback = jest.fn();
        const spyOnCompleteCallback = jest.fn();

        service.getUserLocation().subscribe({
          next: spyOnNextCallback,
          error: (error: Error): void => {
            expect(error.message).toBe('Test error');
            expect(spyOnNextCallback).not.toHaveBeenCalled();
            expect(spyOnCompleteCallback).not.toHaveBeenCalled();
            done();
          },
          complete: spyOnCompleteCallback,
        });
      });
    });
  });
});
