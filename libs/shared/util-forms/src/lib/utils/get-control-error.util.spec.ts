import { FormControl, FormGroup, Validators } from '@angular/forms';

import { getControlError } from './get-control-error.util';

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

  it('given a nested child control path, should correctly recognize it', () => {
    const leaf = new FormControl('a', [Validators.minLength(2)]);
    const form = new FormGroup({
      childL1: new FormGroup({
        leaf,
      }),
    });
    const fn = getControlError.bind(form);
    expect(fn('childL1.leaf.minlength', 'requiredLength')).toBe(2);
  });

  it('given a nested error prop path, should drill down correctly', () => {
    const leaf = new FormControl('a');
    const form = new FormGroup({
      childL1: new FormGroup({
        leaf,
      }),
    });
    const fn = getControlError.bind(form);
    leaf.setErrors({
      errorCode: {
        errorPropL1: {
          errorPropL2: 'Error message',
        },
      },
    });
    expect(fn('childL1.leaf.errorCode', 'errorPropL1.errorPropL2')).toBe(
      'Error message'
    );
  });
});
