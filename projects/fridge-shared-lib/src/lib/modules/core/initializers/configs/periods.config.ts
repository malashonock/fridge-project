import { InjectionToken, Provider } from '@angular/core';

import { Period } from '../../../../models/product/period.enum';

export const periods: Period[] = [
  Period.Months,
  Period.Weeks,
  Period.Days,
  Period.Hours,
];

export const PERIODS = new InjectionToken<string[]>('PERIODS');

export const periodsProvider: Provider = {
  provide: PERIODS,
  useValue: periods,
};
