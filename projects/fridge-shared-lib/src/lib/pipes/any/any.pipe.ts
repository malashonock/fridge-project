import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'any',
  standalone: true,
})
export class AnyPipe implements PipeTransform {
  public transform<T>(object: T): T | false {
    if (!object) {
      return false;
    }

    if (typeof object !== 'object') {
      return object;
    }

    if (Array.isArray(object)) {
      return object.length > 0 ? object : false;
    }

    for (const prop in object) {
      if (Object.prototype.hasOwnProperty.call(object, prop)) {
        const value = object[prop as keyof typeof object];
        if (value) {
          return object;
        }
      }
    }

    return false;
  }
}
