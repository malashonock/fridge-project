import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { SentenceCasePipe } from './pipes/sentence-case/sentence-case.pipe';
import { SplitCamelCasePipe } from './pipes/split-camel-case/split-camel-case.pipe';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { SelectFieldComponent } from './components/select-field/select-field.component';

@NgModule({
  declarations: [
    SentenceCasePipe,
    SplitCamelCasePipe,
    TextFieldComponent,
    SelectFieldComponent,
  ],
  exports: [
    SentenceCasePipe,
    SplitCamelCasePipe,
    TextFieldComponent,
    SelectFieldComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class SharedModule {}
