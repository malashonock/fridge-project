import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getItem(key: string, parsableDateFields: string[] = []): any {
    const itemAsText = window.localStorage.getItem(key);

    if (itemAsText === null) {
      return null;
    }

    const item = JSON.parse(itemAsText);

    if (typeof item !== 'object') {
      return item;
    }

    // overwrite date fields with Date values
    for (const dateField of parsableDateFields) {
      if (Object.hasOwn(item, dateField)) {
        item[dateField] = Date.parse(item[dateField]);
      }
    }

    return item;
  }

  setItem<T>(key: string, item: T): void {
    const itemAsText = JSON.stringify(item);
    window.localStorage.setItem(key, itemAsText);
  }

  removeItem(key: string): void {
    window.localStorage.removeItem(key);
  }
}