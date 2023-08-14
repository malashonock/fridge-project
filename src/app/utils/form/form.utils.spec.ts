import { FormControl, FormGroup, Validators } from '@angular/forms';
import { controlHasError, getControlError } from './form.utils';

describe('form utils', () => {
  describe('controlHasError', () => {
    it('given a valid child control name, should return if the child control has the specified error', () => {
      const child = new FormControl('', [Validators.required]);
      const form = new FormGroup({
        child,
      });
      const fn = controlHasError.bind(form);
      expect(fn('child.required')).toBe(true);

      child.setValue('abc');
      expect(fn('child.required')).toBe(false);
    });

    it('given an invalid child control name, should return null', () => {
      const form = new FormGroup({});
      const fn = controlHasError.bind(form);

      expect(fn('missingChild.required')).toBeNull();
    });
  });

  describe('getControlError', () => {
    it('given a valid child control name, should return if the child control has the specified error', () => {
      const child = new FormControl('a', [Validators.minLength(2)]);
      const form = new FormGroup({
        child,
      });
      const fn = getControlError.bind(form);
      expect(fn('child.minlength', 'requiredLength')).toBe(2);

      child.setValue('abc');
      expect(fn('child.minlength', 'requiredLength')).toBeNull();
    });

    it('given an invalid error property, should return null', () => {
      const child = new FormControl('a', [Validators.minLength(2)]);
      const form = new FormGroup({
        child,
      });
      const fn = getControlError.bind(form);

      // Note the uppercase L in minLength - it's incorrect
      expect(fn('missingChild.minLength', 'requiredLength')).toBeNull();
    });

    it('given an invalid child control name, should return null', () => {
      const form = new FormGroup({});
      const fn = getControlError.bind(form);

      expect(fn('missingChild.minlength', 'requiredLength')).toBeNull();
    });
  });
});
