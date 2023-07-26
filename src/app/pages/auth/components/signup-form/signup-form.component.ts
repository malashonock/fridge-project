import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { UserRole } from 'app/core/models/user/user-role.enum';
import { EmailValidator } from 'app/core/validators/email/email.validator';
import { PasswordValidator } from 'app/core/validators/password/password.validator';
import { AuthActions } from 'app/state/auth/auth.actions';

interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupFormComponent {
  public form: FormGroup;

  public roles: SelectOption[] = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
  ];

  public constructor(formBuilder: FormBuilder, private store: Store) {
    this.form = formBuilder.group(
      {
        userName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, EmailValidator.valid]],
        role: [null as UserRole | null, [Validators.required]],
        password: ['', [Validators.required]],
        passwordConfirm: ['', [Validators.required]],
      },
      {
        validators: [PasswordValidator.match('password', 'passwordConfirm')],
      }
    );
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(
      AuthActions.signup({
        credentials: this.form.value,
      })
    );
  }
}
