import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { LoginCredentials } from 'user-domain';
import { AuthActions } from 'user-data-access';
import { controlHasError, getControlError } from 'shared-util-forms';

@Component({
  selector: 'lib-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  public form = this.formBuilder.nonNullable.group({
    userName: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required]],
  });

  public controlHasError = controlHasError.bind(this.form);
  public getControlError = getControlError.bind(this.form);

  public constructor(private formBuilder: FormBuilder, private store: Store) {}

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(
      AuthActions.login({
        credentials: this.form.value as LoginCredentials,
      })
    );
  }
}
