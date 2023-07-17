import { FormBuilder, ValidatorFn, Validators } from '@angular/forms';

import { FormBaseComponent } from './form-base.component';
import { SentenceCasePipe } from 'app/shared/pipes/sentence-case/sentence-case.pipe';
import { SplitCamelCasePipe } from 'app/shared/pipes/split-camel-case/split-camel-case.pipe';
import { EmailValidator } from 'app/core/validators/email/email.validator';
import { PasswordValidator } from 'app/core/validators/password/password.validator';

describe('FormBaseComponent', () => {
  describe('constructor', () => {
    it('should create an instance', () => {
      const formComponent = new FormBaseComponent(
        {
          userName: [''],
        },
        undefined,
        () => undefined,
        new FormBuilder(),
        new SentenceCasePipe(),
        new SplitCamelCasePipe()
      );
      expect(formComponent).toBeTruthy();
      expect(formComponent instanceof FormBaseComponent).toBe(true);
    });

    it('should initialize form fields properly', () => {
      const userName = 'user';
      const email = 'user@domain.com';
      const birthDate = new Date();

      const formComponent = new FormBaseComponent(
        {
          userName: [userName],
          email: [email],
          birthDate: [birthDate],
        },
        undefined,
        () => undefined,
        new FormBuilder(),
        new SentenceCasePipe(),
        new SplitCamelCasePipe()
      );

      expect(formComponent.form.value).toEqual({
        userName,
        email,
        birthDate,
      });
    });
  });

  describe('getFieldErrorMessage() method', () => {
    it('should return null if there are no errors on the field', () => {
      const formComponent = new FormBaseComponent(
        {
          userName: ['user', Validators.required],
        },
        undefined,
        () => undefined,
        new FormBuilder(),
        new SentenceCasePipe(),
        new SplitCamelCasePipe()
      );

      expect(formComponent.getFieldErrorMessage('userName')).toBe(null);
    });

    it('should detect missing required fields', () => {
      const formComponent = new FormBaseComponent(
        {
          userName: ['', Validators.required],
        },
        undefined,
        () => undefined,
        new FormBuilder(),
        new SentenceCasePipe(),
        new SplitCamelCasePipe()
      );

      expect(formComponent.getFieldErrorMessage('userName')).toBe(
        'User name is required'
      );

      formComponent.form.get('userName')?.setValue('user');
      expect(formComponent.getFieldErrorMessage('userName')).toBe(null);
    });

    it('should detect min length errors', () => {
      const minLength = 2;

      // Note: empty strings are not treated as errors by minLength validator
      const formComponent = new FormBaseComponent(
        {
          userName: ['u', Validators.minLength(minLength)],
        },
        undefined,
        () => undefined,
        new FormBuilder(),
        new SentenceCasePipe(),
        new SplitCamelCasePipe()
      );

      expect(formComponent.getFieldErrorMessage('userName')).toBe(
        `User name should be no shorter than ${minLength} symbols`
      );

      formComponent.form.get('userName')?.setValue('user');
      expect(formComponent.getFieldErrorMessage('userName')).toBe(null);
    });

    it('should detect invalid email errors', () => {
      const formComponent = new FormBaseComponent(
        {
          email: ['www.domain.com', EmailValidator.valid],
        },
        undefined,
        () => undefined,
        new FormBuilder(),
        new SentenceCasePipe(),
        new SplitCamelCasePipe()
      );

      expect(formComponent.getFieldErrorMessage('email')).toBe(
        'Email is not a valid email'
      );

      formComponent.form.get('email')?.setValue('user@domain.com');
      expect(formComponent.getFieldErrorMessage('email')).toBe(null);
    });

    it('given a missing field name, should throw an exception', () => {
      const formComponent = new FormBaseComponent(
        {
          userName: ['user', Validators.required],
        },
        undefined,
        () => undefined,
        new FormBuilder(),
        new SentenceCasePipe(),
        new SplitCamelCasePipe()
      );

      expect(() => formComponent.getFieldErrorMessage('name')).toThrowError(
        "Field 'name' is missing on the form"
      );
    });

    it('given other field errors, should return a fallback error message', () => {
      const formComponent = new FormBaseComponent(
        {
          userName: [
            'SomeVeryVeryVeryVeryVeryVeryLongIcelandicVolcanoName',
            Validators.maxLength(10),
          ],
        },
        undefined,
        () => undefined,
        new FormBuilder(),
        new SentenceCasePipe(),
        new SplitCamelCasePipe()
      );

      expect(formComponent.getFieldErrorMessage('userName')).toBe(
        `User name value is not valid`
      );
    });
  });

  describe('getFormErrorMessage() method', () => {
    it('should return null if there are no form-level errors', () => {
      // Field in itself is invalid,
      // but at form level, there are no errors
      const formComponent = new FormBaseComponent(
        {
          userName: ['', Validators.required],
        },
        undefined,
        () => undefined,
        new FormBuilder(),
        new SentenceCasePipe(),
        new SplitCamelCasePipe()
      );

      expect(formComponent.getFormErrorMessage()).toBe(null);
    });

    it('should detect password mismatch errors', () => {
      const formComponent = new FormBaseComponent(
        {
          password: ['12345'],
          confirmPassword: [''],
        },
        {
          validators: [PasswordValidator.match('password', 'confirmPassword')],
        },
        () => undefined,
        new FormBuilder(),
        new SentenceCasePipe(),
        new SplitCamelCasePipe()
      );

      expect(formComponent.getFormErrorMessage()).toBe("Passwords don't match");
    });

    it('given other form errors, should return a fallback error message', () => {
      const formError = 'Form error message';

      const mockFormValidator: ValidatorFn = () => {
        return {
          formError,
        };
      };

      const formComponent = new FormBaseComponent(
        {
          dateFrom: ['12345'],
          dateTo: [''],
        },
        {
          validators: [mockFormValidator],
        },
        () => undefined,
        new FormBuilder(),
        new SentenceCasePipe(),
        new SplitCamelCasePipe()
      );

      expect(formComponent.getFormErrorMessage()).toBe('Form is not valid');
    });
  });

  describe('reset() method', () => {
    it('should reset form fields to initial values', () => {
      const defaultUserName = 'Enter a name';
      const defaultPassword = 'Enter a password';

      const formComponent = new FormBaseComponent(
        {
          userName: [defaultUserName],
          password: [defaultPassword],
        },
        undefined,
        () => undefined,
        new FormBuilder(),
        new SentenceCasePipe(),
        new SplitCamelCasePipe()
      );

      formComponent.form.setValue({
        userName: 'user',
        password: '12345',
      });

      formComponent.reset();

      expect(formComponent.form.value).toEqual({
        userName: defaultUserName,
        password: defaultPassword,
      });
    });
  });

  describe('onSubmit() method', () => {
    describe('given valid form values', () => {
      it('should call the submit action', () => {
        const spyOnSubmitAction = jest.fn();

        const formComponent = new FormBaseComponent(
          {
            userName: ['user'],
            password: ['12345'],
          },
          undefined,
          spyOnSubmitAction,
          new FormBuilder(),
          new SentenceCasePipe(),
          new SplitCamelCasePipe()
        );

        formComponent.onSubmit();

        expect(spyOnSubmitAction).toHaveBeenCalledTimes(1);
        expect(spyOnSubmitAction).toHaveBeenCalledWith(formComponent.form);
      });

      it('should NOT reset form fields to initial values', () => {
        const formComponent = new FormBaseComponent(
          {
            userName: ['user'],
            password: ['12345'],
          },
          undefined,
          () => undefined,
          new FormBuilder(),
          new SentenceCasePipe(),
          new SplitCamelCasePipe()
        );

        const spyOnReset = jest.spyOn(formComponent, 'reset');

        formComponent.onSubmit();

        expect(spyOnReset).not.toHaveBeenCalled();
      });
    });

    describe('given invalid form values', () => {
      it('should NOT call the submit action', () => {
        const spyOnSubmitAction = jest.fn();

        const formComponent = new FormBaseComponent(
          {
            userName: ['', Validators.required],
          },
          undefined,
          spyOnSubmitAction,
          new FormBuilder(),
          new SentenceCasePipe(),
          new SplitCamelCasePipe()
        );

        formComponent.onSubmit();

        expect(spyOnSubmitAction).not.toHaveBeenCalled();
      });

      it('should NOT reset form fields to initial values', () => {
        const formComponent = new FormBaseComponent(
          {
            userName: ['', Validators.required],
          },
          undefined,
          () => undefined,
          new FormBuilder(),
          new SentenceCasePipe(),
          new SplitCamelCasePipe()
        );

        const spyOnReset = jest.spyOn(formComponent, 'reset');

        formComponent.onSubmit();

        expect(spyOnReset).not.toHaveBeenCalled();
      });
    });
  });
});
