import { Injectable } from '@angular/core';

import { CoreModule } from '@shared/modules/core/core.module';

@Injectable({
  providedIn: CoreModule,
})
export class FormDataService {
  public buildFormData<T extends object>(fields: T): FormData {
    const formData = new FormData();

    for (const fieldName in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, fieldName)) {
        const fieldValue = fields[fieldName as keyof T] as unknown;

        const formDataValue = (() => {
          switch (true) {
            case fieldValue instanceof Blob:
              return fieldValue as Blob;
            default:
              return JSON.stringify(fieldValue);
          }
        })();

        if (fieldValue !== undefined) {
          formData.append(fieldName, formDataValue);
        }
      }
    }

    return formData;
  }
}
