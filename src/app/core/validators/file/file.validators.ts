import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class FileValidators {
  public static type(mimeType: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || !(control.value instanceof File)) {
        return null;
      }

      return control.value.type.match(mimeType)
        ? null
        : {
            fileType: {
              accept: mimeType,
              actual: control.value.type,
            },
          };
    };
  }
}
