import { AbstractControl, FormControl } from '@angular/forms';
import { FileValidator } from './file.validator';
import { FileWithUrl } from 'core/classes';

describe('FileValidator', () => {
  let control: AbstractControl;

  beforeEach(() => {
    control = new FormControl();
  });

  describe('type validator function', () => {
    it('should accept files matching the specified MIME type', () => {
      control.setValue(
        new FileWithUrl(new File(['test'], 'test.png', { type: 'image/png' }))
      );
      expect(FileValidator.type('image/png')(control)).toBeNull();
      expect(FileValidator.type('image/*')(control)).toBeNull();
    });

    it('should return error for files not matching the specified MIME type', () => {
      control.setValue(
        new FileWithUrl(new File(['test'], 'test.txt', { type: 'text/plain' }))
      );
      expect(FileValidator.type('image/*')(control)).toEqual({
        fileType: {
          accept: 'image/*',
          actual: 'text/plain',
        },
      });
    });
  });
});
