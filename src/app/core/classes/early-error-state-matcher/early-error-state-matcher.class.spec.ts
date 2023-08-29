import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { EarlyErrorStateMatcher } from './early-error-state-matcher.class';

describe('EarlyErrorStateMatcher class', () => {
  let errorStateMatcher: EarlyErrorStateMatcher;
  let control: FormControl;
  let form: FormGroup;
  let formGroupDirective: FormGroupDirective;

  beforeEach(() => {
    control = new FormControl();
    form = new FormGroup({ control });
    formGroupDirective = new FormGroupDirective([], []);
    formGroupDirective.form = form;
    errorStateMatcher = new EarlyErrorStateMatcher();
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
        control.setErrors({ required: { required: true } });
      });

      it('given the control is dirty, should return true', () => {
        control.markAsDirty();
        expect(
          errorStateMatcher.isErrorState(control, formGroupDirective)
        ).toBe(true);
      });

      it('given the control is touched, should return true', () => {
        control.markAsTouched();
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
