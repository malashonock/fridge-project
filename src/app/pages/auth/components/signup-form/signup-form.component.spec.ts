import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputHarness } from '@angular/material/input/testing';
import {
  MatFormFieldHarness,
  MatErrorHarness,
} from '@angular/material/form-field/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { SharedModule } from 'shared/shared.module';
import { SignupFormComponent } from './signup-form.component';
import { AuthActions } from 'app/state/auth/auth.actions';
import { SignupCredentials } from 'core/models/auth/signup.interface';
import { UserRole } from 'core/models/user/user-role.enum';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  let loader: HarnessLoader;
  let store: MockStore;
  let userNameInputHarness: MatInputHarness;
  let emailInputHarness: MatInputHarness;
  let roleSelectHarness: MatSelectHarness;
  let passwordInputHarness: MatInputHarness;
  let passwordConfirmInputHarness: MatInputHarness;
  let userNameFieldHarness: MatFormFieldHarness;
  let emailFieldHarness: MatFormFieldHarness;
  let roleFieldHarness: MatFormFieldHarness;
  let passwordFieldHarness: MatFormFieldHarness;
  let passwordConfirmFieldHarness: MatFormFieldHarness;
  let submitButtonHarness: MatButtonHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupFormComponent],
      imports: [
        NoopAnimationsModule,
        SharedModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        RouterTestingModule,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    store = TestBed.inject(MockStore);
    userNameInputHarness = await loader.getHarness(
      MatInputHarness.with({ selector: '#userName' })
    );
    emailInputHarness = await loader.getHarness(
      MatInputHarness.with({ selector: '#email' })
    );
    roleSelectHarness = await loader.getHarness(
      MatSelectHarness.with({ selector: '#role' })
    );
    passwordInputHarness = await loader.getHarness(
      MatInputHarness.with({ selector: '#password' })
    );
    passwordConfirmInputHarness = await loader.getHarness(
      MatInputHarness.with({ selector: '#passwordConfirm' })
    );
    userNameFieldHarness = await loader.getHarness(
      MatFormFieldHarness.with({ floatingLabelText: 'User name' })
    );
    emailFieldHarness = await loader.getHarness(
      MatFormFieldHarness.with({ floatingLabelText: 'Email' })
    );
    roleFieldHarness = await loader.getHarness(
      MatFormFieldHarness.with({ floatingLabelText: 'Role' })
    );
    passwordFieldHarness = await loader.getHarness(
      MatFormFieldHarness.with({ floatingLabelText: 'Password' })
    );
    passwordConfirmFieldHarness = await loader.getHarness(
      MatFormFieldHarness.with({ floatingLabelText: 'Confirm password' })
    );
    submitButtonHarness = await loader.getHarness(MatButtonHarness);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form fields properly', async () => {
    expect(component.form.value).toEqual({
      userName: '',
      email: '',
      role: null,
      password: '',
      passwordConfirm: '',
    });
    expect(await userNameInputHarness.getValue()).toBe('');
    expect(await emailInputHarness.getValue()).toBe('');
    expect(await roleSelectHarness.getValueText()).toBe('Role');
    expect(await passwordInputHarness.getValue()).toBe('');
    expect(await passwordConfirmInputHarness.getValue()).toBe('');
  });

  describe('error messages', () => {
    describe('User name field', () => {
      it('should display required error message correctly', async () => {
        expect(await userNameFieldHarness.getTextErrors()).toHaveLength(0);

        await userNameInputHarness.blur();
        expect(await userNameFieldHarness.getTextErrors()).toHaveLength(1);
        expect((await userNameFieldHarness.getTextErrors())[0]).toBe(
          'User name is required'
        );
      });

      it('should display min length error message correctly', async () => {
        expect(await userNameFieldHarness.getTextErrors()).toHaveLength(0);

        await userNameInputHarness.setValue('a');
        await userNameInputHarness.blur();
        expect(await userNameFieldHarness.getTextErrors()).toHaveLength(1);
        expect((await userNameFieldHarness.getTextErrors())[0]).toBe(
          'User name must be no shorter than 2 symbols'
        );
      });
    });

    describe('Email field', () => {
      it('should display required error message correctly', async () => {
        expect(await emailFieldHarness.getTextErrors()).toHaveLength(0);

        await emailInputHarness.blur();
        expect(await emailFieldHarness.getTextErrors()).toHaveLength(1);
        expect((await emailFieldHarness.getTextErrors())[0]).toBe(
          'Email is required'
        );
      });

      it('should display invalid email message correctly', async () => {
        expect(await emailFieldHarness.getTextErrors()).toHaveLength(0);

        await emailInputHarness.setValue('www.google.com');
        await emailInputHarness.blur();
        expect(await emailFieldHarness.getTextErrors()).toHaveLength(1);
        expect((await emailFieldHarness.getTextErrors())[0]).toBe(
          'Email is not valid'
        );
      });
    });

    describe('Role field', () => {
      it('should display required error message correctly', async () => {
        expect(await roleFieldHarness.getTextErrors()).toHaveLength(0);

        await roleSelectHarness.blur();
        expect(await roleFieldHarness.getTextErrors()).toHaveLength(1);
        expect((await roleFieldHarness.getTextErrors())[0]).toBe(
          'Role is required'
        );
      });
    });

    describe('Password field', () => {
      it('should display required error message correctly', async () => {
        expect(await passwordFieldHarness.getTextErrors()).toHaveLength(0);

        await passwordInputHarness.blur();
        expect(await passwordFieldHarness.getTextErrors()).toHaveLength(1);
        expect((await passwordFieldHarness.getTextErrors())[0]).toBe(
          'Password is required'
        );
      });
    });

    describe('Confirm password field', () => {
      it('should display required error message correctly', async () => {
        expect(await passwordConfirmFieldHarness.getTextErrors()).toHaveLength(
          0
        );

        await passwordConfirmInputHarness.blur();
        expect(await passwordConfirmFieldHarness.getTextErrors()).toHaveLength(
          1
        );
        expect((await passwordConfirmFieldHarness.getTextErrors())[0]).toBe(
          'Password confirmation is required'
        );
      });
    });

    describe('Form-level error messages', () => {
      it('should display passwords mismatch message correctly', async () => {
        const getFormErrorHarness = async () => {
          return await loader.getHarnessOrNull(
            MatErrorHarness.with({ selector: 'form > mat-error' })
          );
        };

        expect(await getFormErrorHarness()).toBeNull();

        await passwordInputHarness.setValue('12345');
        await passwordConfirmInputHarness.setValue('1234');
        await passwordConfirmInputHarness.blur();

        expect(await getFormErrorHarness()).toBeTruthy();
        expect(await (await getFormErrorHarness())?.getText()).toBe(
          "Passwords don't match"
        );
      });
    });
  });

  describe('submit', () => {
    it('given invalid form values, should NOT allow to submit form', async () => {
      const spyOnStoreDispatch = jest.spyOn(store, 'dispatch');

      expect(
        await (await submitButtonHarness.host()).getProperty('disabled')
      ).toBe(true);

      await submitButtonHarness.click();
      expect(spyOnStoreDispatch).not.toHaveBeenCalled();

      component.onSubmit();
      expect(spyOnStoreDispatch).not.toHaveBeenCalled();
    });

    it('given valid form values, should dispatch signup action', async () => {
      const testCredentials: SignupCredentials = {
        userName: 'user',
        email: 'user@domain.com',
        role: UserRole.User,
        password: '12345',
        passwordConfirm: '12345',
      };
      const spyOnStoreDispatch = jest.spyOn(store, 'dispatch');

      expect(
        await (await submitButtonHarness.host()).getProperty('disabled')
      ).toBe(true);

      await userNameInputHarness.setValue(testCredentials.userName);
      await emailInputHarness.setValue(testCredentials.email);
      await roleSelectHarness.clickOptions({ text: 'User' });
      await passwordInputHarness.setValue(testCredentials.password);
      await passwordConfirmInputHarness.setValue(
        testCredentials.passwordConfirm
      );
      expect(
        await (await submitButtonHarness.host()).getProperty('disabled')
      ).toBe(false);

      await submitButtonHarness.click();
      const expectedAction = AuthActions.signup({
        credentials: testCredentials,
      });

      expect(spyOnStoreDispatch).toHaveBeenCalledTimes(1);
      expect(spyOnStoreDispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});
