import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ImageUploaderComponent,
  MaterialModule,
  NumericInputDirective,
  OrPipe,
  SearchBoxComponent,
} from 'shared-ui';
import { SharedUtilFormsModule } from 'shared-util-forms';
import { SharedFeatureMapModule } from 'shared-feature-map';

import { FridgeFormComponent } from './components/fridge-form/fridge-form.component';
import { ProductAutocompleteComponent } from './components/product-autocomplete/product-autocomplete.component';
import { ProductsInputComponent } from './components/products-input/products-input.component';

@NgModule({
  declarations: [
    FridgeFormComponent,
    ProductAutocompleteComponent,
    ProductsInputComponent,
  ],
  imports: [
    CommonModule,
    SharedUtilFormsModule,
    MaterialModule,
    SharedFeatureMapModule,
    ImageUploaderComponent,
    NumericInputDirective,
    SearchBoxComponent,
    OrPipe,
  ],
})
export class FridgeFeatureFormModule {}
