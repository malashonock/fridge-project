import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { getDecimalSeparator } from '@shared/utils/i18n/i18n.utils';

@Pipe({
  name: 'money',
  standalone: true,
})
export class MoneyPipe implements PipeTransform {
  private get decimalSeparator(): string {
    return getDecimalSeparator(this.locale);
  }

  public constructor(@Inject(LOCALE_ID) private locale: string) {}

  public transform(value: number): string {
    const integerPart = Math.floor(value);
    const fractionPart = Math.floor((value - integerPart) * 100);

    const dollars = `<span class="dollars">${integerPart}${this.decimalSeparator}</span>`;
    const cents = `<sup class="cents">${fractionPart
      .toString()
      .padStart(2, '0')}</sup>`;

    return dollars + cents;
  }
}
