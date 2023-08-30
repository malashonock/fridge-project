import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'or',
})
export class OrPipe implements PipeTransform {
  public transform(value: any, fallback: any): any {
    return value ?? fallback;
  }
}
