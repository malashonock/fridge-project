import { Pipe, PipeTransform } from '@angular/core';
import { UnitOfWeight } from 'core/models/product/unit-of-weight.enum';

@Pipe({
  name: 'weightUnit',
})
export class WeightUnitPipe implements PipeTransform {
  public transform(unit: UnitOfWeight): string {
    return ((): string => {
      switch (unit) {
        case UnitOfWeight.Grams:
          return $localize`:@@grams:g`;
        case UnitOfWeight.Milliliters:
          return $localize`:@@milliliters:ml`;
        default:
          throw new Error('Unknown unit of weight');
      }
    })();
  }
}
