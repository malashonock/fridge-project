import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { UserButtonComponent } from './components/user-button/user-button.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { BurgerButtonComponent } from './components/burger-button/burger-button.component';
import { MapComponent } from './components/map/map.component';
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
    UserRoleLabelPipe,
    WeightUnitLabelPipe,
    NutrientLabelPipe,
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
    UserRoleLabelPipe,
    WeightUnitLabelPipe,
    NutrientLabelPipe,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MaterialModule],
})
export class SharedModule {}
