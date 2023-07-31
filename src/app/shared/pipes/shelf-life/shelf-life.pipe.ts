import { Pipe, PipeTransform } from '@angular/core';
import { ShelfLife } from 'core/models/product/shelf-life.interface';

@Pipe({
  name: 'shelfLife',
})
export class ShelfLifePipe implements PipeTransform {
  transform(shelfLife: ShelfLife): string {
    return Object.entries(shelfLife)
      .map(([key, value]): string => {
        return `${value}${key[0]}`;
      })
      .join(' ');
  }
}
