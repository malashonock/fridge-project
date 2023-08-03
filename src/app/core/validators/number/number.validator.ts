import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class NumberValidator {
  public static number(control: AbstractControl): ValidationErrors | null {
    return control.value && Number.isNaN(Number(control.value))
      ? {
          isNaN: {
            isNaN: true,
          },
        }
      : null;
  }

  public static maxFractionDigits(maxFractionDigits: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || NumberValidator.number(control) !== null) {
        return null;
      }

      const x = Math.abs(control.value * 10 ** maxFractionDigits);
      const fractionOverflow = x - Math.floor(x);

      return fractionOverflow < Number.EPSILON
        ? null
        : {
            fractionOverflow: {
              maxFractionDigits,
            },
          };
    };
  }

  public static integer(control: AbstractControl): ValidationErrors | null {
    return NumberValidator.maxFractionDigits(0)(control);
  }

  public static greaterThan(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (
        (!control.value && control.value !== 0) ||
        NumberValidator.number(control) !== null
      ) {
        return null;
      }

      return control.value > min ? null : { greaterThan: { min } };
    };
  }
}
