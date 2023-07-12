import { FormGroup, FormBuilder, AbstractControlOptions } from '@angular/forms';

import { SentenceCasePipe } from 'app/shared/pipes/sentence-case/sentence-case.pipe';
import { SplitCamelCasePipe } from 'app/shared/pipes/split-camel-case/split-camel-case.pipe';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormValues = { [key: string]: any };
type FormControls = Parameters<typeof FormBuilder.prototype.group>[0];

export class FormBaseComponent {
  readonly form: FormGroup;
  protected initialValues: FormValues = {};

  constructor(
    controls: FormControls,
    options: AbstractControlOptions | undefined,
    private submitAction: (form: FormGroup) => void,
    formBuilder: FormBuilder,
    private sentenceCasePipe: SentenceCasePipe,
    private splitCamelCasePipe: SplitCamelCasePipe
  ) {
    this.form = formBuilder.group(controls, options);

    // Parse the initial values
    for (const fieldName of Object.keys(controls)) {
      this.initialValues[fieldName] = controls[fieldName][0];
    }
  }

  getFieldErrorMessage(fieldKey: string, fieldName?: string): string | null {
    if (!Object.hasOwn(this.form.controls, fieldKey)) {
      throw new Error(`Field '${fieldKey}' is missing on the form`);
    }

    const fieldErrors = this.form.controls[fieldKey].errors;

    if (!fieldErrors) {
      return null;
    }

    const fieldNameFormatted =
      fieldName ||
      this.sentenceCasePipe.transform(
        this.splitCamelCasePipe.transform(fieldKey)
      );

    if (fieldErrors?.['required']) {
      return `${fieldNameFormatted} is required`;
    }

    if (fieldErrors?.['minlength']) {
      const { requiredLength } = fieldErrors['minlength'];
      return `${fieldNameFormatted} should be no shorter than ${requiredLength} symbols`;
    }

    if (fieldErrors?.['invalidEmail']) {
      return `${fieldNameFormatted} is not a valid email`;
    }

    return `${fieldNameFormatted} value is not valid`;
  }

  getFormErrorMessage(): string | null {
    const formErrors = this.form.errors;

    if (!formErrors) {
      return null;
    }

    if (formErrors?.['passwordsMismatch']) {
      return `Passwords don't match`;
    }

    return `Form is not valid`;
  }

  reset(): void {
    this.form.reset(this.initialValues);

    // Clear error state for each control
    Object.keys(this.form.controls).forEach((key): void => {
      this.form.controls[key].setErrors(null);
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitAction(this.form);

    this.reset();
  }
}
