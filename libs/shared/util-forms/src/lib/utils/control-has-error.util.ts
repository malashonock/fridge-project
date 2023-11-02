import { FormGroup } from '@angular/forms';

export function controlHasError(
  this: FormGroup,
  childControlErrorPath: string
): boolean | null {
  const childControlErrorPathSegments = childControlErrorPath.split('.');
  const errorCode = childControlErrorPathSegments.at(-1) || '';
  const childControlPath = childControlErrorPathSegments.slice(0, -1).join('.');
  return this.get(childControlPath)?.hasError(errorCode) ?? null;
}
