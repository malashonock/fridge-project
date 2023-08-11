import { FormGroup } from '@angular/forms';

export function controlHasError(
  this: FormGroup,
  childControlErrorPath: string
): boolean | null {
  const [childControlPath, errorCode] = childControlErrorPath.split('.');
  return this.get(childControlPath)?.hasError(errorCode) ?? null;
}

export function getControlError(
  this: FormGroup,
  childControlErrorPath: string
): any {
  const [childControlPath, errorCode, errorProp] =
    childControlErrorPath.split('.');
  const error = this.get(childControlPath)?.errors?.[errorCode] ?? null;
  return errorProp ? error?.[errorProp] ?? null : error;
}
