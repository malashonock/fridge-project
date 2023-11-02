import { ControlValueAccessor } from '@angular/forms';

export type ControlValueAccessorImplementor = new (
  ...args: any[]
) => ControlValueAccessor;
