import { Pipe, PipeTransform } from '@angular/core';

import { Period } from 'product-domain';
import { NounCase } from 'shared-util-i18n';

@Pipe({
  name: 'periodLabel',
  standalone: true,
})
export class PeriodLabelPipe implements PipeTransform {
  public transform(period: Period, nounCase: NounCase = 'nominative'): string {
    return (() => {
      switch (nounCase) {
        case 'nominative':
          switch (period) {
            case Period.Months:
              return $localize`:@@months:Months`;
            case Period.Weeks:
              return $localize`:@@weeks:Weeks`;
            case Period.Days:
              return $localize`:@@days:Days`;
            case Period.Hours:
              return $localize`:@@hours:Hours`;
            default:
              throw new Error('Unsupported period');
          }

        case 'genitive':
          switch (period) {
            case Period.Months:
              return $localize`:@@monthsGenitive:Months`;
            case Period.Weeks:
              return $localize`:@@weeksGenitive:Weeks`;
            case Period.Days:
              return $localize`:@@daysGenitive:Days`;
            case Period.Hours:
              return $localize`:@@hoursGenitive:Hours`;
            default:
              throw new Error('Unsupported period');
          }

        default:
          throw new Error('Unsupported noun case');
      }
    })();
  }
}
