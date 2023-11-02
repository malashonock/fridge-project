import { Provider, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ControlValueAccessorImplementor } from '../types/control-value-accessor-implementor.type';

export const ngValueAccessorProvider = (
  implementorClass: ControlValueAccessorImplementor
): Provider => {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => implementorClass),
    multi: true,
  };
};
