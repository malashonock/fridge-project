import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SentenceCasePipe } from './pipes/sentence-case/sentence-case.pipe';
import { SplitCamelCasePipe } from './pipes/split-camel-case/split-camel-case.pipe';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { SelectFieldComponent } from './components/select-field/select-field.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    SentenceCasePipe,
    SplitCamelCasePipe,
    TextFieldComponent,
    SelectFieldComponent,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SentenceCasePipe,
    SplitCamelCasePipe,
    TextFieldComponent,
    SelectFieldComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
})
export class SharedModule {}
