import { Pipe, PipeTransform } from '@angular/core';

import { ShelfLife } from '../../../models/product/shelf-life.type';

@Pipe({
  name: 'shelfLifeLabel',
  standalone: true,
})
export class ShelfLifeLabelPipe implements PipeTransform {
  public transform(shelfLife: ShelfLife): string {
    return Object.entries(shelfLife)
      .map(([key, value]): string => {
        const unit = ((): string => {
          switch (key) {
            case 'months':
              return $localize`:@@monthsAbbrev:mo`;
            case 'weeks':
              return $localize`:@@weeksAbbrev:wk`;
            case 'days':
              return $localize`:@@daysAbbrev:d`;
            case 'hours':
              return $localize`:@@hoursAbbrev:h`;
            default:
              throw new Error('Unknown period');
          }
        })();
        return value ? `${value} ${unit}` : '';
      })
      .filter((chunk: string): boolean => !!chunk)
      .join(', ');
  }
}
