import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitCamelCase',
})
export class SplitCamelCasePipe implements PipeTransform {
  transform(text: string): string {
    if (text.length === 0) {
      return '';
    }

    const words: string[][] = [];
    let i = -1;

    text.split('').forEach((letter: string, index: number) => {
      const isUpper =
        letter === letter.toUpperCase() && letter !== letter.toLowerCase();
      const isFirst = index === 0;

      if (isFirst || isUpper) {
        i++;
        words[i] = [];
      }

      words[i].push(letter);
    });

    return words
      .map((letters: string[]): string => {
        return letters.join('');
      })
      .join(' ');
  }
}
