import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import {
  LoginCredentials,
  AuthActions,
  controlHasError,
  getControlError,
} from 'fridge-shared-lib';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  public form = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required]],
  });

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

  public controlHasError = controlHasError.bind(this.form);
  public getControlError = getControlError.bind(this.form);
}