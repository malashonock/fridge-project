import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FileInputDirective } from './directives/file-input/file-input.directive';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';

@NgModule({
  declarations: [FileInputDirective, ImageUploaderComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FileInputDirective, ImageUploaderComponent],
})
export class FileUploadModule {}
