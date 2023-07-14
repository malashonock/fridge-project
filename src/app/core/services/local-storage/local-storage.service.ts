/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
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
        item[dateField] = new Date(Date.parse(item[dateField]));
      }
    }

    return item;
  }

  setItem(key: string, item: any): void {
    if (typeof item === 'object') {
      for (const field of Object.keys(item)) {
        if (item[field] instanceof Date) {
          item[field] = item[field].toISOString();
        }
      }
    }

    const itemAsText = JSON.stringify(item);
    window.localStorage.setItem(key, itemAsText);
  }

  removeItem(key: string): void {
    window.localStorage.removeItem(key);
  }
}
