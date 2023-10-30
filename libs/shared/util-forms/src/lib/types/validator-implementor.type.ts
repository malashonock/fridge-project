import { Validator } from '@angular/forms';

export type ValidatorImplementor = new (...args: any[]) => Validator;
