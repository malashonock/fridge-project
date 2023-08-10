import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthActions } from 'app/state/auth';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  public form: FormGroup;

  public constructor(formBuilder: FormBuilder, private store: Store) {
    this.form = formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required]],
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(
      AuthActions.login({
        credentials: this.form.value,
      })
    );
  }
}
