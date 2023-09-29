import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormDataService } from './services/form-data/form-data.service';

@NgModule({
  providers: [FormDataService],
  exports: [ReactiveFormsModule],
})
export class SharedUtilFormsModule {}
