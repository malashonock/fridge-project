import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

import { ComboErrorStateMatcher } from './combo-error-state-matcher.class';
import { EarlyErrorStateMatcher } from '../early-error-state-matcher/early-error-state-matcher.class';

describe('ComboErrorStateMatcher class', () => {
  let errorStateMatcher: ComboErrorStateMatcher;
  let control: FormControl;
  let sibling: FormControl;
  let parent: FormGroup;
  let formGroupDirective: FormGroupDirective;

  beforeEach(() => {
    control = new FormControl();
    sibling = new FormControl();
    parent = new FormGroup({ control, sibling });
    formGroupDirective = new FormGroupDirective([], []);
    formGroupDirective.form = parent;
    errorStateMatcher = new ComboErrorStateMatcher();
  });

  it('should create', () => {
    expect(errorStateMatcher).toBeTruthy();
  });

  describe('isErrorState() method', () => {
    it('given a null control, should return false', () => {
      expect(errorStateMatcher.isErrorState(null, null)).toBe(false);
    });

    it('given a control with valid state, should return false', () => {
      control.setErrors(null);
      expect(errorStateMatcher.isErrorState(control, formGroupDirective)).toBe(
        false
      );
    });

    describe('given a control with invalid state', () => {
      beforeEach(() => {
        control.setValue(0);
        control.setErrors({ min: { min: 1 } });
      });

      it('given the control is not part of a FormGroup, should call base EarlyErrorStateMatcher#isErrorState() method', () => {
        const spyOnBaseIsErrorState = jest.spyOn(
          EarlyErrorStateMatcher.prototype,
          'isErrorState'
        );
        const control = new FormControl();
        control.setErrors({ min: { min: 0 } });
        errorStateMatcher.isErrorState(control, null);
        expect(spyOnBaseIsErrorState).toHaveBeenCalledWith(control, null);
      });

      it('given the control and all its siblings have their initial values, should return false', () => {
        control.setValue('');
        sibling.setValue(null);
        control.setErrors({ min: { min: 1 } });

        expect(
          errorStateMatcher.isErrorState(control, formGroupDirective)
        ).toBe(false);
      });

      it('given the control or any of its siblings are dirty, should return true', () => {
        parent.markAsDirty();
        expect(
          errorStateMatcher.isErrorState(control, formGroupDirective)
        ).toBe(true);
      });

      it('given the control or any of its siblings are touched, should return true', () => {
        parent.markAsTouched();
        expect(
          errorStateMatcher.isErrorState(control, formGroupDirective)
        ).toBe(true);
      });

      it('given the form is null, should return false', () => {
        expect(errorStateMatcher.isErrorState(control, null)).toBe(false);
      });

      it('given the form is submitted, should return true', () => {
        formGroupDirective.onSubmit(new Event('submit'));
        expect(
          errorStateMatcher.isErrorState(control, formGroupDirective)
        ).toBe(true);
      });
    });
  });
});
