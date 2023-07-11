import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SignupCredentials } from 'app/auth/models/signup.model';
import { UserRole } from 'app/shared/models/user/user-role.model';
import { SentenceCasePipe } from 'app/shared/pipes/sentence-case/sentence-case.pipe';
import { SplitCamelCasePipe } from 'app/shared/pipes/split-camel-case/split-camel-case.pipe';
import { EmailValidator } from 'app/shared/validators/email/email.validator';
import { PasswordValidator } from 'app/shared/validators/password/password.validator';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent {
  initialValues = {
    userName: '',
    email: '',
    role: null,
    password: '',
    passwordConfirm: '',
  };

  form: FormGroup = this.formBuilder.group(
    {
      userName: [
        this.initialValues.userName,
        [Validators.required, Validators.minLength(2)],
      ],
      email: [
        this.initialValues.email,
        [Validators.required, EmailValidator.valid],
      ],
      role: [this.initialValues.role as UserRole | null, [Validators.required]],
      password: [this.initialValues.password, [Validators.required]],
      passwordConfirm: [
        this.initialValues.passwordConfirm,
        [Validators.required],
      ],
    },
    {
      validators: [PasswordValidator.match('password', 'passwordConfirm')],
    }
  );

  constructor(
    private formBuilder: FormBuilder,
    private sentenceCasePipe: SentenceCasePipe,
    private splitCamelCasePipe: SplitCamelCasePipe
  ) {}

  getFieldErrorMessage(fieldName: keyof SignupCredentials): string | null {
    const fieldErrors = this.form.controls[fieldName].errors;

    if (!fieldErrors) {
      return null;
    }

    const fieldNameFormatted = this.sentenceCasePipe.transform(
      this.splitCamelCasePipe.transform(fieldName)
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

    // TODO: dispatch login event to store
    console.log(this.form.value);

    this.reset();
  }
}
