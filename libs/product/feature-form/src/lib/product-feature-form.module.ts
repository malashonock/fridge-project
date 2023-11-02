import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductUiModule } from 'product-ui';
import {
  ImageUploaderComponent,
  MaterialModule,
  NumericInputDirective,
} from 'shared-ui';
import { SharedUtilFormsModule } from 'shared-util-forms';

import { ProductFormComponent } from './components/product-form/product-form.component';

@NgModule({
  declarations: [ProductFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedUtilFormsModule,
    NumericInputDirective,
    ProductUiModule,
    ImageUploaderComponent,
  ],
})
export class ProductFeatureFormModule {}
