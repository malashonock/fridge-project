import { NgModule } from '@angular/core';

import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { CounterInputComponent } from './components/counter-input/counter-input.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NumericInputDirective } from './directives/numeric-input/numeric-input.directive';
import { FileInputDirective } from './directives/file-input/file-input.directive';
import { AnyPipe } from './pipes/any/any.pipe';
import { KeysPipe } from './pipes/keys/keys.pipe';
import { MoneyPipe } from './pipes/money/money.pipe';
import { OrPipe } from './pipes/or/or.pipe';
import { MaterialModule } from './modules/material/material.module';

const components = [
  ConfirmDeleteComponent,
  CounterInputComponent,
  ImageUploaderComponent,
  MenuItemComponent,
  SearchBoxComponent,
  PageNotFoundComponent,
];

const directives = [FileInputDirective, NumericInputDirective];

const pipes = [AnyPipe, KeysPipe, MoneyPipe, OrPipe];

@NgModule({
  imports: [components, directives, pipes],
  exports: [components, directives, pipes, MaterialModule],
})
export class SharedUiModule {}
