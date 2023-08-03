import { FileWithUrl } from './file-with-url.class';
import { ObjectUrlSpies } from 'rootDir/jest-global-mocks';

describe('FileWithUrl class', () => {
  let file: FileWithUrl;

  beforeAll(() => {
    ObjectUrlSpies.spyOnCreateObjectURL.mockReturnValue('mock URL');
  });

  beforeEach(() => {
    file = new FileWithUrl(['Test file'], 'test.txt');
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create an instance', () => {
      expect(file).toBeTruthy();
    });

    it('should call URL.createObjectURL and store the result in the url instance field', () => {
      expect(ObjectUrlSpies.spyOnCreateObjectURL).toHaveBeenCalledWith(file);
      expect(file.url).toBe('mock URL');
    });
  });

  describe('onDestroy() method', () => {
    it('should call URL.revokeObjectURL', () => {
      file.onDestroy();
      expect(ObjectUrlSpies.spyOnRevokeObjectURL).toHaveBeenCalled();
    });
  });
});
