import { InjectionToken, Provider } from '@angular/core';

import { Nutrient } from '@shell/core/models/product/nutrient.enum';

export const nutrients: Nutrient[] = [
  Nutrient.Proteins,
  Nutrient.Fats,
  Nutrient.Carbs,
];

export const NUTRIENTS = new InjectionToken<string[]>('NUTRIENTS');

export const nutrientsProvider: Provider = {
  provide: NUTRIENTS,
  useValue: nutrients,
};
