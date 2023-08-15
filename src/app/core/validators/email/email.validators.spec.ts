import { AbstractControl, FormControl } from '@angular/forms';

import { EmailValidators } from './email.validators';

describe('Email validators', () => {
  let control: AbstractControl;

  beforeEach(() => {
    control = new FormControl();
  });

  it('should return null for valid passwords', () => {
    control.setValue('recipient@domain.com');
    expect(EmailValidators.valid(control)).toBeNull();

    control.setValue('RECIPIENT@DOMAIN.COM');
    expect(EmailValidators.valid(control)).toBeNull();

    control.setValue('first-name.last-name+123@sub-domain.domain.com');
    expect(EmailValidators.valid(control)).toBeNull();
  });

  it('should require the @ sign', () => {
    const invalidEmail = 'recipient.domain.com';
    control.setValue(invalidEmail);
    expect(EmailValidators.valid(control)).toEqual({ invalidEmail });
  });

  describe('recipient name validation', () => {
    it('should require a recipient name', () => {
      const invalidEmail = '@domain.com';
      control.setValue(invalidEmail);
      expect(EmailValidators.valid(control)).toEqual({ invalidEmail });
    });

    it('should not start or end with special chars', () => {
      let invalidEmail = '~recipient@domain.com';
      control.setValue(invalidEmail);
      expect(EmailValidators.valid(control)).toEqual({ invalidEmail });

      invalidEmail = 'recipient!@domain.com';
      control.setValue(invalidEmail);
      expect(EmailValidators.valid(control)).toEqual({ invalidEmail });
    });

    it('should not contain multiple special chars in a row', () => {
      const invalidEmail = 'first--name..last--name@domain.com';
      control.setValue(invalidEmail);
      expect(EmailValidators.valid(control)).toEqual({ invalidEmail });
    });
  });

  describe('domain name validation', () => {
    it('should require a domain name', () => {
      const invalidEmail = 'recipient@';
      control.setValue(invalidEmail);
      expect(EmailValidators.valid(control)).toEqual({ invalidEmail });
    });

    it('should not allow other special chars except dot and hyphen', () => {
      let invalidEmail = 'recipient@sub+domain.com';
      control.setValue(invalidEmail);
      expect(EmailValidators.valid(control)).toEqual({ invalidEmail });

      invalidEmail = 'recipient@sub_domain.com';
      control.setValue(invalidEmail);
      expect(EmailValidators.valid(control)).toEqual({ invalidEmail });

      const validEmail = 'recipient@sub-domain.domain.com';
      control.setValue(validEmail);
      expect(EmailValidators.valid(control)).toBeNull;
    });

    it('should not start or end with special chars', () => {
      let invalidEmail = 'recipient@-domain.com';
      control.setValue(invalidEmail);
      expect(EmailValidators.valid(control)).toEqual({ invalidEmail });

      invalidEmail = 'recipient@domain-.com';
      control.setValue(invalidEmail);
      expect(EmailValidators.valid(control)).toEqual({ invalidEmail });
    });

    it('should not contain multiple special chars in a row', () => {
      const invalidEmail = 'recipient@sub--domain..domain.com';
      control.setValue(invalidEmail);
      expect(EmailValidators.valid(control)).toEqual({ invalidEmail });
    });
  });

  describe('top-level domain validation', () => {
    it('should require a top-level domain name', () => {
      const invalidEmail = 'recipient@domain';
      control.setValue(invalidEmail);
      expect(EmailValidators.valid(control)).toEqual({ invalidEmail });
    });

    it('after leading dot, should allow at minimum 2 letters', () => {
      const invalidEmail = 'recipient@domain.x';
      control.setValue(invalidEmail);
      expect(EmailValidators.valid(control)).toEqual({ invalidEmail });
    });

    it('after leading dot, should allow only English letters', () => {
      let invalidEmail = 'recipient@domain.com123';
      control.setValue(invalidEmail);
      expect(EmailValidators.valid(control)).toEqual({ invalidEmail });

      invalidEmail = 'recipient@domain.com-org';
      control.setValue(invalidEmail);
      expect(EmailValidators.valid(control)).toEqual({ invalidEmail });
    });
  });
});
