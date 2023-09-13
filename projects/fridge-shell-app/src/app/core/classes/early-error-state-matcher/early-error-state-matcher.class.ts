import { Injectable } from '@angular/core';
import { AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Injectable()
export class EarlyErrorStateMatcher implements ErrorStateMatcher {
  public isErrorState(
    control: AbstractControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    if (!control?.invalid) {
      return false;
    }

    return Boolean(control.dirty || control.touched || form?.submitted);
  }
}
