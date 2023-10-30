import { AbstractControl, FormControl } from '@angular/forms';

import { NumberValidators } from './number.validators';

describe('NumberValidators', () => {
  let control: AbstractControl;

  beforeEach(() => {
    control = new FormControl();
  });

  describe('number validator function', () => {
    it('given a control with empty value, should return no error', () => {
      control.setValue('');
      expect(NumberValidators.number(control)).toBeNull();
    });

    it('given a control with a numeric value, should return an error', () => {
      control.setValue(123.456);
      expect(NumberValidators.number(control)).toBeNull();

      control.setValue('123.456');
      expect(NumberValidators.number(control)).toBeNull();

      control.setValue('123.');
      expect(NumberValidators.number(control)).toBeNull();

      control.setValue('000123');
      expect(NumberValidators.number(control)).toBeNull();
    });

    it('given a control with a non-numeric value, should return an error', () => {
      control.setValue('abcd');
      expect(NumberValidators.number(control)).toEqual({
        isNaN: {
          isNaN: true,
        },
      });

      control.setValue('-1/2');
      expect(NumberValidators.number(control)).toEqual({
        isNaN: {
          isNaN: true,
        },
      });
    });
  });

  describe('maxFractionDigits validator function', () => {
    it('given a control with empty value, should return no error', () => {
      control.setValue('');
      expect(NumberValidators.maxFractionDigits(0)(control)).toBeNull();

      control.setValue(null);
      expect(NumberValidators.maxFractionDigits(0)(control)).toBeNull();

      control.setValue(undefined);
      expect(NumberValidators.maxFractionDigits(0)(control)).toBeNull();
    });

    it('given a control with a non-numeric value, should return no error', () => {
      control.setValue('abcd');
      expect(NumberValidators.maxFractionDigits(0)(control)).toBeNull();
    });

    it('given a zero or positive maxFractionDigits arg, should signal fraction part overflow correctly', () => {
      control.setValue('000123.');
      expect(NumberValidators.maxFractionDigits(0)(control)).toBeNull();

      control.setValue('123.456000');

      expect(NumberValidators.maxFractionDigits(0)(control)).toEqual({
        fractionOverflow: {
          maxFractionDigits: 0,
        },
      });

      expect(NumberValidators.maxFractionDigits(1)(control)).toEqual({
        fractionOverflow: {
          maxFractionDigits: 1,
        },
      });

      expect(NumberValidators.maxFractionDigits(2)(control)).toEqual({
        fractionOverflow: {
          maxFractionDigits: 2,
        },
      });

      expect(NumberValidators.maxFractionDigits(3)(control)).toBeNull();
      expect(NumberValidators.maxFractionDigits(4)(control)).toBeNull();
      expect(NumberValidators.maxFractionDigits(5)(control)).toBeNull();
      expect(NumberValidators.maxFractionDigits(6)(control)).toBeNull();
    });

    it('given a negative maxFractionDigits, should correctly check against tens/hundreds/thousands etc.', () => {
      control.setValue(123);
      expect(NumberValidators.maxFractionDigits(-1)(control)).toEqual({
        fractionOverflow: {
          maxFractionDigits: -1,
        },
      });

      control.setValue(120);
      expect(NumberValidators.maxFractionDigits(-1)(control)).toBeNull();
      expect(NumberValidators.maxFractionDigits(-2)(control)).toEqual({
        fractionOverflow: {
          maxFractionDigits: -2,
        },
      });

      control.setValue(100);
      expect(NumberValidators.maxFractionDigits(-1)(control)).toBeNull();
      expect(NumberValidators.maxFractionDigits(-2)(control)).toBeNull();
      expect(NumberValidators.maxFractionDigits(-3)(control)).toEqual({
        fractionOverflow: {
          maxFractionDigits: -3,
        },
      });
    });

    it('should handle negative numbers correctly', () => {
      control.setValue(-123.45);
      expect(NumberValidators.maxFractionDigits(0)(control)).toEqual({
        fractionOverflow: {
          maxFractionDigits: 0,
        },
      });
      expect(NumberValidators.maxFractionDigits(1)(control)).toEqual({
        fractionOverflow: {
          maxFractionDigits: 1,
        },
      });
      expect(NumberValidators.maxFractionDigits(2)(control)).toBeNull();

      control.setValue(-100);
      expect(NumberValidators.maxFractionDigits(-1)(control)).toBeNull();
      expect(NumberValidators.maxFractionDigits(-2)(control)).toBeNull();
      expect(NumberValidators.maxFractionDigits(-3)(control)).toEqual({
        fractionOverflow: {
          maxFractionDigits: -3,
        },
      });
    });
  });

  describe('integer validation function', () => {
    it('given a control with an integer number, should return no error', () => {
      control.setValue(123);
      expect(NumberValidators.integer(control)).toBeNull();

      control.setValue('123.');
      expect(NumberValidators.integer(control)).toBeNull();

      control.setValue('123.000');
      expect(NumberValidators.integer(control)).toBeNull();

      control.setValue(-123);
      expect(NumberValidators.integer(control)).toBeNull();
    });

    it('given a control with a floating-point number, should return an error', () => {
      control.setValue(123.45);
      expect(NumberValidators.integer(control)).toEqual({
        fractionOverflow: {
          maxFractionDigits: 0,
        },
      });

      control.setValue(-123.45);
      expect(NumberValidators.integer(control)).toEqual({
        fractionOverflow: {
          maxFractionDigits: 0,
        },
      });
    });
  });

  describe('greaterThan validation function', () => {
    it('given a control with a non-numeric value, should return no error', () => {
      control.setValue('abcd');
      expect(NumberValidators.greaterThan(0)(control)).toBeNull();
    });

    it('given a control with the value less than min, should return an error', () => {
      control.setValue(-123);
      expect(NumberValidators.greaterThan(0)(control)).toEqual({
        greaterThan: {
          min: 0,
        },
      });

      control.setValue(123);
      expect(NumberValidators.greaterThan(200)(control)).toEqual({
        greaterThan: {
          min: 200,
        },
      });
    });

    it('given a control with the value equal to min, should return an error', () => {
      control.setValue(0);
      expect(NumberValidators.greaterThan(0)(control)).toEqual({
        greaterThan: {
          min: 0,
        },
      });

      control.setValue(100);
      expect(NumberValidators.greaterThan(100)(control)).toEqual({
        greaterThan: {
          min: 100,
        },
      });

      control.setValue(-100);
      expect(NumberValidators.greaterThan(-100)(control)).toEqual({
        greaterThan: {
          min: -100,
        },
      });
    });

    it('given a control with the value greater than min, should return no error', () => {
      control.setValue(123);
      expect(NumberValidators.greaterThan(0)(control)).toBeNull();

      control.setValue(200);
      expect(NumberValidators.greaterThan(100)(control)).toBeNull();

      control.setValue(-100);
      expect(NumberValidators.greaterThan(-1000)(control)).toBeNull();
    });
  });
});
