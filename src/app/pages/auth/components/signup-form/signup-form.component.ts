import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { UserRole } from 'core/models/user/user-role.enum';
import { EmailValidators } from 'core/validators/email/email.validators';
import { PasswordValidators } from 'core/validators/password/password.validators';
import { AuthActions } from 'app/state/auth/auth.actions';
import { SignupCredentials } from 'core/models/auth/signup.interface';
import { controlHasError, getControlError } from 'utils/form/form.utils';
import { USER_ROLES } from 'core/configs/user-roles.config';

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
      email: ['', [Validators.required, EmailValidators.valid]],
      role: [null as UserRole | null, [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
    },
    {
      validators: [PasswordValidators.match('password', 'passwordConfirm')],
    }
  );

  public constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    @Inject(USER_ROLES) public userRoles: UserRole[]
  ) {}

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

  public controlHasError = controlHasError.bind(this.form);
  public getControlError = getControlError.bind(this.form);
}
