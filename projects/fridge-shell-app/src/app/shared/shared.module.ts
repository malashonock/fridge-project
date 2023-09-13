import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { UserButtonComponent } from './components/user-button/user-button.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { BurgerButtonComponent } from './components/burger-button/burger-button.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { InitialsPipe } from './pipes/initials/initials.pipe';
import { MoneyPipe } from './pipes/money/money.pipe';
import { KeysPipe } from './pipes/keys/keys.pipe';
import { AnyPipe } from './pipes/any/any.pipe';
import { MobileMenuDirective } from './directives/mobile/menu/mobile-menu.directive';
import { FixedHeaderDirective } from './directives/fixed-header/fixed-header.directive';
import { FileInputDirective } from './directives/file-input/file-input.directive';
import { NumericInputDirective } from './directives/numeric-input/numeric-input.directive';
import { UserRoleLabelPipe } from './pipes/label/user-role/user-role-label.pipe';
import { WeightUnitLabelPipe } from './pipes/label/weight-unit/weight-unit-label.pipe';
import { NutrientLabelPipe } from './pipes/label/nutrient/nutrient-label.pipe';
import { PeriodLabelPipe } from './pipes/label/period/period-label.pipe';
import { ProductCategoryLabelPipe } from './pipes/label/product-category/product-category-label.pipe';
import { ShelfLifeLabelPipe } from './pipes/label/shelf-life/shelf-life-label.pipe';
import { StaticAssetUrlPipe } from './pipes/static-asset-url/static-asset-url.pipe';
import { AddressLabelPipe } from './pipes/label/address/address-label.pipe';
import { OrPipe } from './pipes/or/or.pipe';
import { CounterInputComponent } from './components/counter-input/counter-input.component';
import { GeolocationInputComponent } from './components/geolocation-input/geolocation-input.component';
import { MapInputComponent } from './components/map-input/map-input.component';

const exportedComponents = [
  HeaderComponent,
  MenuItemComponent,
  SearchBoxComponent,
  ImageUploaderComponent,
  ConfirmDeleteComponent,
  CounterInputComponent,
  GeolocationInputComponent,
  MapInputComponent,
];

const components = [
  ...exportedComponents,
  LogoComponent,
  UserButtonComponent,
  BurgerButtonComponent,
];

const exportedDirectives = [
  MobileMenuDirective,
  FixedHeaderDirective,
  FileInputDirective,
  NumericInputDirective,
];

const directives = [...exportedDirectives];

const labelPipes = [
  UserRoleLabelPipe,
  WeightUnitLabelPipe,
  NutrientLabelPipe,
  PeriodLabelPipe,
  ProductCategoryLabelPipe,
  ShelfLifeLabelPipe,
  AddressLabelPipe,
];

const exportedPipes = [
  MoneyPipe,
  KeysPipe,
  AnyPipe,
  OrPipe,
  StaticAssetUrlPipe,
  ...labelPipes,
];

const pipes = [...exportedPipes, InitialsPipe];

@NgModule({
  declarations: [components, directives, pipes],
  exports: [
    exportedComponents,
    exportedDirectives,
    exportedPipes,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterLink],
  providers: [AnyPipe],
})
export class SharedModule {}
