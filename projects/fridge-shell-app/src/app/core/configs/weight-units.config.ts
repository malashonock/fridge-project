import { InjectionToken, Provider } from '@angular/core';

import { UnitOfWeight } from '@shell/core/models/product/unit-of-weight.enum';

export const weightUnits: UnitOfWeight[] = [
  UnitOfWeight.Grams,
  UnitOfWeight.Milliliters,
];

export const WEIGHT_UNITS = new InjectionToken<UnitOfWeight[]>('WEIGHT_UNITS');

export const weightUnitsProvider: Provider = {
  provide: WEIGHT_UNITS,
  useValue: weightUnits,
};
