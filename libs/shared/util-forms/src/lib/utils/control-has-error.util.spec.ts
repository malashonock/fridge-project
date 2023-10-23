import { FormControl, FormGroup, Validators } from '@angular/forms';

import { controlHasError } from './control-has-error.util';

describe('controlHasError util', () => {
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

  it('given a nested child control path, should correctly recognize it', () => {
    const leaf = new FormControl('a', [Validators.minLength(2)]);
    const form = new FormGroup({
      childL1: new FormGroup({
        leaf,
      }),
    });
    const fn = controlHasError.bind(form);
    expect(fn('childL1.leaf.minlength')).toBe(true);
  });
});
