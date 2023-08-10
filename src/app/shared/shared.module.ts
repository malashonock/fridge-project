import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material/material.module';
import {
  HeaderComponent,
  LogoComponent,
  UserButtonComponent,
  MenuItemComponent,
  BurgerButtonComponent,
  MapComponent,
  SearchBoxComponent,
  ImageUploaderComponent,
  ConfirmDeleteComponent,
} from './components';
import { InitialsPipe, MoneyPipe, KeysPipe, AnyPipe } from './pipes';
import {
  MobileMenuDirective,
  FixedHeaderDirective,
  FileInputDirective,
  NumericInputDirective,
} from './directives';

@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    UserButtonComponent,
    InitialsPipe,
    MenuItemComponent,
    BurgerButtonComponent,
    MobileMenuDirective,
    FixedHeaderDirective,
    MapComponent,
    SearchBoxComponent,
    MoneyPipe,
    KeysPipe,
    ImageUploaderComponent,
    FileInputDirective,
    NumericInputDirective,
    AnyPipe,
    ConfirmDeleteComponent,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    HeaderComponent,
    MenuItemComponent,
    MobileMenuDirective,
    FixedHeaderDirective,
    MapComponent,
    SearchBoxComponent,
    MoneyPipe,
    KeysPipe,
    ImageUploaderComponent,
    FileInputDirective,
    NumericInputDirective,
    AnyPipe,
    ConfirmDeleteComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MaterialModule],
})
export class SharedModule {}
