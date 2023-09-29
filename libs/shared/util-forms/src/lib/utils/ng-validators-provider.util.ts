import { Provider, forwardRef } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';

import { ValidatorImplementor } from '../types/validator-implementor.type';

export const ngValidatorsProvider = (
  implementorClass: ValidatorImplementor
): Provider => {
  return {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => implementorClass),
    multi: true,
  };
};
