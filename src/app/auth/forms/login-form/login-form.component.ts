import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { FormBaseComponent } from 'app/shared/components/form-base/form-base.component';
import { SentenceCasePipe } from 'app/shared/pipes/sentence-case/sentence-case.pipe';
import { SplitCamelCasePipe } from 'app/shared/pipes/split-camel-case/split-camel-case.pipe';
import { AuthActions } from 'app/state/auth/auth.actions';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent extends FormBaseComponent {
  constructor(
    formBuilder: FormBuilder,
    sentenceCasePipe: SentenceCasePipe,
    splitCamelCasePipe: SplitCamelCasePipe,
    private store: Store
  ) {
    // Instantiate base class
    super(
      {
        userName: ['', [Validators.required, Validators.minLength(2)]],
        password: ['', [Validators.required]],
      },
      undefined,
      (form: FormGroup): void => {
        this.store.dispatch(
          AuthActions.login({
            credentials: form.value,
          })
        );
      },
      formBuilder,
      sentenceCasePipe,
      splitCamelCasePipe
    );
  }
}
