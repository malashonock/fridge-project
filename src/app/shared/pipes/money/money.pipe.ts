import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money',
})
export class MoneyPipe implements PipeTransform {
  transform(value: number): string {
    const integerPart = Math.floor(value);
    const fractionPart = Math.floor((value - integerPart) * 100);

    const dollars = `<span class="dollars">${integerPart}</span>`;
    const cents = `<sup class="cents">${fractionPart
      .toString()
      .padStart(2, '0')}</sup>`;

    return dollars + cents;
  }
}
