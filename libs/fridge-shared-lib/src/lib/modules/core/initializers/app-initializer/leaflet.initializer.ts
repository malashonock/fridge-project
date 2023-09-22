import { APP_INITIALIZER, Provider } from '@angular/core';
import * as L from 'leaflet';

const initializeLeaflet = (): void => {
  // Fix Leaflet marker bug
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
};

export const LeafletInitializer: Provider = {
  provide: APP_INITIALIZER,
  useFactory: () => initializeLeaflet,
  multi: true,
};
