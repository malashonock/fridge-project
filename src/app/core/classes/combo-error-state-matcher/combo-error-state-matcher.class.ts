import {
  AbstractControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { EarlyErrorStateMatcher } from '../early-error-state-matcher/early-error-state-matcher.class';

export class ComboErrorStateMatcher extends EarlyErrorStateMatcher {
  public constructor() {
    super();
  }

  public override isErrorState(
    control: AbstractControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    if (!control?.invalid) {
      return false;
    }

    const { parent } = control;
    if (!parent) {
      return super.isErrorState(control, form);
    }

    const siblings: AbstractControl[] = Object.values(parent.controls);
    const allSiblingsReset = siblings.every(
      (sibling: AbstractControl): boolean => {
        return Validators.required(sibling) !== null;
      }
    );
    if (allSiblingsReset) {
      return false;
    }

    return Boolean(parent.dirty || parent.touched || form?.submitted);
  }
}
