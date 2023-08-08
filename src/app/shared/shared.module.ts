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
} from './components';
import { InitialsPipe, MoneyPipe, KeysPipe } from './pipes';
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
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MaterialModule],
})
export class SharedModule {}
