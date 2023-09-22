import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'or',
  standalone: true,
})
export class OrPipe implements PipeTransform {
  public transform(value: any, fallback: any): any {
    return value ?? fallback;
  }
}
