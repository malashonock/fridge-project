import { Provider, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
} from '@angular/forms';

export type ChangeEventHandler<T> = (value: T) => void;

export function controlHasError(
  this: FormGroup,
  childControlErrorPath: string
): boolean | null {
  const childControlErrorPathSegments = childControlErrorPath.split('.');
  const errorCode = childControlErrorPathSegments.at(-1) || '';
  const childControlPath = childControlErrorPathSegments.slice(0, -1).join('.');
  return this.get(childControlPath)?.hasError(errorCode) ?? null;
}

export function getControlError(
  this: FormGroup,
  childControlErrorPath: string,
  errorPropPath?: string
): any {
  const childControlErrorPathSegments = childControlErrorPath.split('.');
  const errorCode = childControlErrorPathSegments.at(-1) || '';
  const childControlPath = childControlErrorPathSegments.slice(0, -1).join('.');

  const control = this.get(childControlPath);
  const error = control?.errors?.[errorCode] ?? null;

  if (!error || !errorPropPath) {
    return error;
  }

  // Drill down along the error prop path
  const errorProps = errorPropPath.split('.');
  let errorPropValue = error;
  for (const errorProp of errorProps) {
    errorPropValue = errorPropValue[errorProp];
  }
  return errorPropValue;
}

export type ControlValueAccessorImplementor = new (
  ...args: any[]
) => ControlValueAccessor;

export type ValidatorImplementor = new (...args: any[]) => Validator;

export const ngValueAccessorProvider = (
  implementorClass: ControlValueAccessorImplementor
): Provider => {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => implementorClass),
    multi: true,
  };
};

export const ngValidatorsProvider = (
  implementorClass: ValidatorImplementor
): Provider => {
  return {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => implementorClass),
    multi: true,
  };
};
