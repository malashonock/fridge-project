import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { SentenceCasePipe } from './pipes/sentence-case/sentence-case.pipe';
import { SplitCamelCasePipe } from './pipes/split-camel-case/split-camel-case.pipe';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SentenceCasePipe, SplitCamelCasePipe, TextFieldComponent],
  exports: [SentenceCasePipe, SplitCamelCasePipe, TextFieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class SharedModule {}
