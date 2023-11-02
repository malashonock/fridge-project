import { Pipe, PipeTransform } from '@angular/core';

import { NounCase } from 'shared-util-i18n';

import { Nutrient } from 'product-domain';

@Pipe({
  name: 'nutrientLabel',
  standalone: true,
})
export class NutrientLabelPipe implements PipeTransform {
  public transform(
    nutrient: Nutrient,
    nounCase: NounCase = 'nominative'
  ): string {
    return (() => {
      switch (nounCase) {
        case 'nominative':
          switch (nutrient) {
            case Nutrient.Proteins:
              return $localize`:@@proteins:Proteins`;
            case Nutrient.Fats:
              return $localize`:@@fats:Fats`;
            case Nutrient.Carbs:
              return $localize`:@@carbs:Carbs`;
            default:
              throw new Error('Unsupported nutrient');
          }

        case 'genitive':
          switch (nutrient) {
            case Nutrient.Proteins:
              return $localize`:@@proteinsGenitive:Proteins`;
            case Nutrient.Fats:
              return $localize`:@@fatsGenitive:Fats`;
            case Nutrient.Carbs:
              return $localize`:@@carbsGenitive:Carbs`;
            default:
              throw new Error('Unsupported nutrient');
          }

        default:
          throw new Error('Unsupported noun case');
      }
    })();
  }
}
