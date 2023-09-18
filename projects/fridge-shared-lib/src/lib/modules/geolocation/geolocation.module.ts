import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MapInputComponent } from './components/map-input/map-input.component';
import { GeolocationInputComponent } from './components/geolocation-input/geolocation-input.component';
import { NumericInputDirective } from '../../directives/numeric-input/numeric-input.directive';

const materialModules = [MatFormFieldModule];

@NgModule({
  declarations: [MapInputComponent, GeolocationInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    materialModules,
    NumericInputDirective,
  ],
  exports: [MapInputComponent, GeolocationInputComponent],
})
export class GeolocationModule {}
