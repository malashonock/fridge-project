import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormBaseComponent } from 'app/shared/components/form-base/form-base.component';
import { SentenceCasePipe } from 'app/shared/pipes/sentence-case/sentence-case.pipe';
import { SplitCamelCasePipe } from 'app/shared/pipes/split-camel-case/split-camel-case.pipe';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent extends FormBaseComponent {
  constructor(
    formBuilder: FormBuilder,
    sentenceCasePipe: SentenceCasePipe,
    splitCamelCasePipe: SplitCamelCasePipe
  ) {
    // Instantiate base class
    super(
      {
        userName: ['', [Validators.required, Validators.minLength(2)]],
        password: ['', [Validators.required]],
      },
      undefined,
      (form: FormGroup): void => console.log(form.value),
      formBuilder,
      sentenceCasePipe,
      splitCamelCasePipe
    );
  }
}
