import { FileWithUrl } from './file-with-url.class';
import { ObjectUrlSpies } from 'jest-global-mocks';

describe('FileWithUrl class', () => {
  let file: FileWithUrl;

  beforeAll(() => {
    ObjectUrlSpies.spyOnCreateObjectURL.mockReturnValue('mock URL');
  });

  beforeEach(() => {
    file = new FileWithUrl(new File(['Test file'], 'test.txt'));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create an instance', () => {
      expect(file).toBeTruthy();
    });

    it('given a url, should store it in the url instance field', () => {
      file = new FileWithUrl(
        new File(['Test file'], 'test.txt'),
        'http://some.url/asset-id'
      );
      expect(file.url).toBe('http://some.url/asset-id');
    });

    it('given no url, should call URL.createObjectURL and store the result in the url instance field', () => {
      expect(ObjectUrlSpies.spyOnCreateObjectURL).toHaveBeenCalledWith(file);
      expect(file.url).toBe('mock URL');
    });
  });

  describe('destroy() method', () => {
    it('should call URL.revokeObjectURL', () => {
      file.destroy();
      expect(ObjectUrlSpies.spyOnRevokeObjectURL).toHaveBeenCalled();
    });
  });
});
