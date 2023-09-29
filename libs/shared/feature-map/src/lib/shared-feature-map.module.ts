import { NgModule } from '@angular/core';

import { MapInputComponent } from './components/map-input/map-input.component';
import { GeolocationInputComponent } from './components/geolocation-input/geolocation-input.component';
import { LeafletInitializer } from './initializers/leaflet.initializer';
import { NavigatorService } from './services/navigator/navigator.service';

const components = [MapInputComponent, GeolocationInputComponent];

@NgModule({
  imports: [components],
  exports: [components],
  providers: [LeafletInitializer, NavigatorService],
})
export class SharedFeatureMapModule {}
