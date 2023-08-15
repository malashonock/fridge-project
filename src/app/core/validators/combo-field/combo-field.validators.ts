import { FormGroup, ValidationErrors, Validators } from '@angular/forms';

export class ComboFieldValidators {
  public static allOrNone(control: FormGroup): ValidationErrors | null {
    const subcontrols = Object.entries(control.controls);
    const emptySubcontrols: string[] = [];
    const filledSubcontrols: string[] = [];

    subcontrols.forEach(([subcontrolName, subcontrol]): void => {
      (subcontrol && Validators.required(subcontrol) !== null
        ? emptySubcontrols
        : filledSubcontrols
      ).push(subcontrolName);
    });

    const valid =
      emptySubcontrols.length === subcontrols.length ||
      filledSubcontrols.length === subcontrols.length;

    if (!valid) {
      emptySubcontrols.forEach((subcontrolName: string): void => {
        const subcontrol = control.controls[subcontrolName];
        subcontrol.setErrors({
          ...subcontrol.errors,
          requiredByParent: true,
        });
      });
    }

    return valid
      ? null
      : {
          partiallyFilled: {
            filledSubcontrols,
            emptySubcontrols,
          },
        };
  }
}
