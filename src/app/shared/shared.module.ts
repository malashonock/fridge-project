import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SentenceCasePipe } from './pipes/sentence-case/sentence-case.pipe';
import { SplitCamelCasePipe } from './pipes/split-camel-case/split-camel-case.pipe';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { SelectFieldComponent } from './components/select-field/select-field.component';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { UserButtonComponent } from './components/user-button/user-button.component';
import { InitialsPipe } from './pipes/initials/initials.pipe';
import { MenuItemComponent } from './components/menu-item/menu-item.component';

@NgModule({
  declarations: [
    SentenceCasePipe,
    SplitCamelCasePipe,
    TextFieldComponent,
    SelectFieldComponent,
    HeaderComponent,
    LogoComponent,
    UserButtonComponent,
    InitialsPipe,
    MenuItemComponent,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SentenceCasePipe,
    SplitCamelCasePipe,
    TextFieldComponent,
    SelectFieldComponent,
    HeaderComponent,
    LogoComponent,
    MenuItemComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MaterialModule],
})
export class SharedModule {}
