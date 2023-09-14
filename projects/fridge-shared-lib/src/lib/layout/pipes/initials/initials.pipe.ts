import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toInitials',
})
export class InitialsPipe implements PipeTransform {
  public transform(fullName: string | null): string {
    return (
      fullName
        ?.trim()
        .replace(/\s+/, ' ')
        .split(' ')
        .filter((_, index: number) => index <= 1)
        .map((word: string) => word[0])
        .join('')
        .toUpperCase() || ''
    );
  }
}
