import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { UserRole } from 'core/models/user/user-role.enum';
import { SelectOption } from 'core/models/ui/select-option.interface';
import { EmailValidator } from 'core/validators/email/email.validator';
import { PasswordValidator } from 'core/validators/password/password.validator';
import { AuthActions } from 'app/state/auth/auth.actions';
import { SignupCredentials } from 'core/models/auth/signup.interface';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupFormComponent {
  public form = this.formBuilder.group(
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

  // TODO: fetch on startup and select from store
  public roles: SelectOption[] = [
    { value: UserRole.User, label: 'User' },
    { value: UserRole.Admin, label: 'Admin' },
  ];

  public constructor(private formBuilder: FormBuilder, private store: Store) {}

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(
      AuthActions.signup({
        credentials: this.form.value as SignupCredentials,
      })
    );
  }
}
