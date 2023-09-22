import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  AddressLabelPipe,
  AnyPipe,
  ConfirmDeleteComponent,
  CounterInputComponent,
  FileUploadModule,
  GeolocationModule,
  LayoutModule,
  MaterialModule,
  MenuItemComponent,
  MoneyPipe,
  NumericInputDirective,
  NutrientLabelPipe,
  OrPipe,
  PeriodLabelPipe,
  ProductCategoryLabelPipe,
  SearchBoxComponent,
  ShelfLifeLabelPipe,
  StaticAssetUrlPipe,
  WeightUnitLabelPipe,
} from 'fridge-shared-lib';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AdminIndexComponent } from './components/admin-index/admin-index.component';
import { ProductsComponent } from './components/products/products.component';
import { FridgesComponent } from './components/fridges/fridges.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { adminPageMenuConfigProvider } from './configs/admin-page-menu.config';
import { FridgeCardComponent } from './components/fridge-card/fridge-card.component';
import { FridgesGridComponent } from './components/fridges-grid/fridges-grid.component';
import { FridgeFormComponent } from './components/fridge-form/fridge-form.component';
import { ProductsInputComponent } from './components/products-input/products-input.component';
import { ProductAutocompleteComponent } from './components/product-autocomplete/product-autocomplete.component';
import { FridgesMapComponent } from './components/fridges-map/fridges-map.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    AdminIndexComponent,
    ProductsComponent,
    FridgesComponent,
    ProductDetailsComponent,
    ProductsTableComponent,
    ProductFormComponent,
    FridgeCardComponent,
    FridgesGridComponent,
    FridgeFormComponent,
    ProductsInputComponent,
    ProductAutocompleteComponent,
    FridgesMapComponent,
  ],
  exports: [AdminPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AdminRoutingModule,
    LayoutModule,
    MenuItemComponent,
    StaticAssetUrlPipe,
    AddressLabelPipe,
    ProductCategoryLabelPipe,
    NutrientLabelPipe,
    WeightUnitLabelPipe,
    PeriodLabelPipe,
    ShelfLifeLabelPipe,
    NumericInputDirective,
    SearchBoxComponent,
    OrPipe,
    AnyPipe,
    MoneyPipe,
    ConfirmDeleteComponent,
    FileUploadModule,
    GeolocationModule,
    CounterInputComponent,
  ],
  providers: [adminPageMenuConfigProvider, AnyPipe],
})
export class AdminModule {}
