import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatButtonHarness } from '@angular/material/button/testing';

import {
  MaterialModule,
  AuthActions,
  mockLoginCredentials,
} from 'fridge-shared-lib';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let loader: HarnessLoader;
  let store: MockStore;
  let userNameInputHarness: MatInputHarness;
  let passwordInputHarness: MatInputHarness;
  let userNameFieldHarness: MatFormFieldHarness;
  let passwordFieldHarness: MatFormFieldHarness;
  let submitButtonHarness: MatButtonHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [NoopAnimationsModule, MaterialModule, RouterTestingModule],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    store = TestBed.inject(MockStore);
    userNameInputHarness = await loader.getHarness(
      MatInputHarness.with({ selector: '#userName' })
    );
    passwordInputHarness = await loader.getHarness(
      MatInputHarness.with({ selector: '#password' })
    );
    userNameFieldHarness = await loader.getHarness(
      MatFormFieldHarness.with({ floatingLabelText: 'User name' })
    );
    passwordFieldHarness = await loader.getHarness(
      MatFormFieldHarness.with({ floatingLabelText: 'Password' })
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
      password: '',
    });
    expect(await userNameInputHarness.getValue()).toBe('');
    expect(await passwordInputHarness.getValue()).toBe('');
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

    it('given valid form values, should dispatch login action', async () => {
      const spyOnStoreDispatch = jest.spyOn(store, 'dispatch');

      expect(
        await (await submitButtonHarness.host()).getProperty('disabled')
      ).toBe(true);

      await userNameInputHarness.setValue(mockLoginCredentials.userName);
      await passwordInputHarness.setValue(mockLoginCredentials.password);
      expect(
        await (await submitButtonHarness.host()).getProperty('disabled')
      ).toBe(false);

      await submitButtonHarness.click();
      const expectedAction = AuthActions.login({
        credentials: mockLoginCredentials,
      });

      expect(spyOnStoreDispatch).toHaveBeenCalledTimes(1);
      expect(spyOnStoreDispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});
