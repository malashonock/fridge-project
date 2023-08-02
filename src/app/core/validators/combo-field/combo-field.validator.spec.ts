import { FormControl, FormGroup } from '@angular/forms';

import { ComboFieldValidator } from './combo-field.validator';

describe('Combo field validator', () => {
  let comboField: FormGroup;
  let subfield1: FormControl;
  let subfield2: FormControl;

  beforeEach(() => {
    comboField = new FormGroup({
      subfield1: new FormControl(),
      subfield2: new FormControl(),
    });
    subfield1 = comboField.get('subfield1') as FormControl;
    subfield2 = comboField.get('subfield2') as FormControl;
  });

  describe('allOrNone() method', () => {
    it('should allow all empty subfields', () => {
      expect(ComboFieldValidator.allOrNone(comboField)).toBeNull();

      subfield1.setValue('');
      subfield2.setValue('');
      expect(ComboFieldValidator.allOrNone(comboField)).toBeNull();

      subfield1.setValue(null);
      subfield2.setValue(undefined);
      expect(ComboFieldValidator.allOrNone(comboField)).toBeNull();
    });

    it('should allow all filled subfields', () => {
      subfield1.setValue('abcdef');
      subfield2.setValue('12345');
      expect(ComboFieldValidator.allOrNone(comboField)).toBeNull();
    });

    it('should reject partially filled combo field', () => {
      subfield1.setValue(null);
      subfield2.setValue('12345');
      expect(ComboFieldValidator.allOrNone(comboField)).toEqual({
        partiallyFilled: {
          filledSubcontrols: ['subfield2'],
          emptySubcontrols: ['subfield1'],
        },
      });
    });
  });
});
