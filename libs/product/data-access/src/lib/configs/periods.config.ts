import { InjectionToken, Provider } from '@angular/core';

import { Period } from 'product-domain';

export const periods: Period[] = [
  Period.Months,
  Period.Weeks,
  Period.Days,
  Period.Hours,
];

export const PERIODS = new InjectionToken<string[]>('PERIODS');

export const providePeriods = (): Provider => ({
  provide: PERIODS,
  useValue: periods,
});
