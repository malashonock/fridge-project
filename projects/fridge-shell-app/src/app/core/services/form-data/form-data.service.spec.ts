import { TestBed } from '@angular/core/testing';

import { FormDataService } from './form-data.service';

describe('FormDataService', () => {
  let service: FormDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should append Blob values as is', () => {
    const file = new File(['test'], 'test.txt');

    const fields = {
      file,
    };

    const formData = service.buildFormData(fields);

    expect(formData.get('file')).toBe(file);
  });

  it('should JSON.stringify other values', () => {
    const fields = {
      name: 'user',
      age: 30,
      married: false,
      birthDate: new Date(Date.UTC(2000, 0, 1)),
      nullable: null,
      optional: undefined,
      manager: {
        name: 'user',
        age: 30,
        married: false,
      },
    };

    const formData = service.buildFormData(fields);

    expect(formData.get('name')).toBe('"user"');
    expect(formData.get('age')).toBe('30');
    expect(formData.get('married')).toBe('false');
    expect(formData.get('birthDate')).toBe('"2000-01-01T00:00:00.000Z"');
    expect(formData.get('nullable')).toBe('null');
    expect(formData.get('optional')).toBeNull();
    expect(formData.get('manager')).toBe(
      '{"name":"user","age":30,"married":false}'
    );
  });
});
