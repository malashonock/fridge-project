import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormBaseComponent } from 'app/shared/components/form-base/form-base.component';
import { SelectOption } from 'app/shared/components/select-field/select-field.component';
import { UserRole } from 'app/core/models/user/user-role.model';
import { SentenceCasePipe } from 'app/shared/pipes/sentence-case/sentence-case.pipe';
import { SplitCamelCasePipe } from 'app/shared/pipes/split-camel-case/split-camel-case.pipe';
import { EmailValidator } from 'app/shared/validators/email/email.validator';
import { PasswordValidator } from 'app/shared/validators/password/password.validator';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent extends FormBaseComponent {
  roles: SelectOption[] = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
  ];

  constructor(
    formBuilder: FormBuilder,
    sentenceCasePipe: SentenceCasePipe,
    splitCamelCasePipe: SplitCamelCasePipe
  ) {
    // Instantiate base class
    super(
      {
        userName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, EmailValidator.valid]],
        role: [null as UserRole | null, [Validators.required]],
        password: ['', [Validators.required]],
        passwordConfirm: ['', [Validators.required]],
      },
      {
        validators: [PasswordValidator.match('password', 'passwordConfirm')],
      },
      (form: FormGroup): void => console.log(form.value),
      formBuilder,
      sentenceCasePipe,
      splitCamelCasePipe
    );
  }
}
