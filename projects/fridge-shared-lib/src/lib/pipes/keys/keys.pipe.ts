import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys',
  standalone: true,
})
export class KeysPipe implements PipeTransform {
  public transform(object: object): (keyof typeof object)[] {
    return Object.keys(object) as keyof typeof object;
  }
}
