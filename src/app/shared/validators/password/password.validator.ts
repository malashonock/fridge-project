import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidator {
  static match(
    passwordFieldName: string,
    passwordConfirmFieldName: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get(passwordFieldName)?.value;
      const passwordConfirm = control.get(passwordConfirmFieldName)?.value;

      return password === passwordConfirm
        ? null
        : {
            passwordsMismatch: {
              password,
              passwordConfirm,
            },
          };
    };
  }
}
