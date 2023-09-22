import { AbstractControl, FormControl } from '@angular/forms';

import { FileValidators } from './file.validators';
import { FileWithUrl } from '../../modules/file-upload/classes/file-with-url/file-with-url.class';

describe('FileValidators', () => {
  let control: AbstractControl;

  beforeEach(() => {
    control = new FormControl();
  });

  describe('type validator function', () => {
    it('should accept files matching the specified MIME type', () => {
      control.setValue(
        new FileWithUrl(new File(['test'], 'test.png', { type: 'image/png' }))
      );
      expect(FileValidators.type('image/png')(control)).toBeNull();
      expect(FileValidators.type('image/*')(control)).toBeNull();
    });

    it('should return error for files not matching the specified MIME type', () => {
      control.setValue(
        new FileWithUrl(new File(['test'], 'test.txt', { type: 'text/plain' }))
      );
      expect(FileValidators.type('image/*')(control)).toEqual({
        fileType: {
          accept: 'image/*',
          actual: 'text/plain',
        },
      });
    });
  });
});
