/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@angular/core';

import { CoreModule } from '@shared/core/core.module';

@Injectable({
  providedIn: CoreModule,
})
export class LocalStorageService {
  public getItem(key: string, parsableDateFields: string[] = []): any {
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
        const parsedDate: number = Date.parse(item[dateField]);

        item[dateField] = !Number.isNaN(parsedDate)
          ? new Date(Date.parse(item[dateField]))
          : item[dateField];
      }
    }

    return item;
  }

  public setItem(key: string, item: any): void {
    const itemAsText = JSON.stringify(item);
    window.localStorage.setItem(key, itemAsText);
  }

  public removeItem(key: string): void {
    window.localStorage.removeItem(key);
  }
}
