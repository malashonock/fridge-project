import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidator {
  static match(
    passwordFieldName: string,
    passwordConfirmFieldName: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get(passwordFieldName);
      const passwordConfirm = control.get(passwordConfirmFieldName);

      return password === passwordConfirm
        ? {
            passwordsMismatch: {
              password,
              passwordConfirm,
            },
          }
        : null;
    };
  }
}
