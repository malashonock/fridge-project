import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { UserRole, SignupCredentials } from 'user-domain';
import { USER_ROLES, AuthActions } from 'user-data-access';
import {
  EmailValidators,
  PasswordValidators,
  controlHasError,
  getControlError,
} from 'shared-util-forms';

@Component({
  selector: 'lib-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupFormComponent {
  public form = this.formBuilder.nonNullable.group(
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

  public controlHasError = controlHasError.bind(this.form);
  public getControlError = getControlError.bind(this.form);

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
}
