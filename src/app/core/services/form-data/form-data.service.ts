import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
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
            case fieldValue instanceof Date:
              return (fieldValue as Date).toISOString();
            case typeof fieldValue === 'object':
              return JSON.stringify(fieldValue);
            default:
              return (fieldValue as string | number | boolean).toString();
          }
        })();

        formData.append(fieldName, formDataValue);
      }
    }

    return formData;
  }
}
