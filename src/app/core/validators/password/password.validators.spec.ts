/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { FormControl, FormGroup } from '@angular/forms';

import { PasswordValidators } from './password.validators';

describe('Password validators', () => {
  let form: FormGroup;
  const password = 'password';
  const passwordConfirm = 'passwordConfirm';

  beforeEach(() => {
    form = new FormGroup({
      [password]: new FormControl(),
      [passwordConfirm]: new FormControl(),
    });
  });

  it('should allow same passwords', () => {
    const passwordField = form.get(password)!;
    const passwordConfirmField = form.get(passwordConfirm)!;

    passwordField.setValue('12345');
    passwordConfirmField.setValue('12345');

    const passwordMatchValidator = PasswordValidators.match(
      password,
      passwordConfirm
    );

    expect(passwordMatchValidator(form)).toBeNull();
  });

  it('should reject differing passwords', () => {
    const passwordField = form.get(password)!;
    const passwordConfirmField = form.get(passwordConfirm)!;

    passwordField.setValue('12345');
    passwordConfirmField.setValue('abcdef');

    const passwordMatchValidator = PasswordValidators.match(
      password,
      passwordConfirm
    );

    expect(passwordMatchValidator(form)).toEqual({
      passwordsMismatch: {
        password: passwordField.value,
        passwordConfirm: passwordConfirmField.value,
      },
    });
  });
});
