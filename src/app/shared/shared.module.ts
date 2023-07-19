import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SentenceCasePipe } from './pipes/sentence-case/sentence-case.pipe';
import { SplitCamelCasePipe } from './pipes/split-camel-case/split-camel-case.pipe';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { SelectFieldComponent } from './components/select-field/select-field.component';
import { MaterialModule } from './material/material.module';
import { LogoComponent } from './components/logo/logo.component';
import { InitialsPipe } from './pipes/initials/initials.pipe';

@NgModule({
  declarations: [
    SentenceCasePipe,
    SplitCamelCasePipe,
    TextFieldComponent,
    SelectFieldComponent,
    LogoComponent,
    InitialsPipe,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SentenceCasePipe,
    SplitCamelCasePipe,
    TextFieldComponent,
    SelectFieldComponent,
    LogoComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
})
export class SharedModule {}
