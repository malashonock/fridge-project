import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let localStorageService: LocalStorageService;

  const spyOnLocalStorageGetItem = jest.fn();
  const spyOnLocalStorageSetItem = jest.fn();
  const spyOnLocalStorageRemoveItem = jest.fn();

  jest.spyOn(window, 'localStorage', 'get').mockReturnValue({
    length: 0,
    getItem: spyOnLocalStorageGetItem,
    setItem: spyOnLocalStorageSetItem,
    removeItem: spyOnLocalStorageRemoveItem,
    clear: jest.fn(),
    key: jest.fn(),
  });

  const mockDate = new Date();

  const mockObject = {
    string: 'text',
    number: 12345,
    boolean: true,
    validDate1: mockDate.toISOString(),
    validDate2: mockDate.toISOString(),
    validDate3: mockDate.toISOString(),
    invalidDate: 'invalid-date',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [LocalStorageService],
    });
    localStorageService = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(localStorageService).toBeTruthy();
  });

  describe('getItem() method', () => {
    it('should call window.localStorage.getItem() method', () => {
      spyOnLocalStorageGetItem.mockReturnValue(null);
      localStorageService.getItem('auth');
      expect(spyOnLocalStorageGetItem).toHaveBeenCalledTimes(1);
      expect(spyOnLocalStorageGetItem).toHaveBeenCalledWith('auth');
    });

    it('given there is no item in local storage, should return null', () => {
      spyOnLocalStorageGetItem.mockReturnValue(null);
      expect(localStorageService.getItem('whatever')).toBe(null);
    });

    it('given a list of valid parsable date fields, should coerce them to Date', () => {
      spyOnLocalStorageGetItem.mockReturnValue(JSON.stringify(mockObject));

      expect(
        localStorageService.getItem('whatever', ['validDate1', 'validDate2'])
      ).toEqual({
        ...mockObject,
        validDate1: mockDate,
        validDate2: mockDate,
      });
    });

    it('given an unparsable date field, should leave its original value', () => {
      spyOnLocalStorageGetItem.mockReturnValue(JSON.stringify(mockObject));

      expect(
        localStorageService.getItem('whatever', ['validDate1', 'invalidDate'])
      ).toEqual({
        ...mockObject,
        validDate1: mockDate,
      });
    });

    it('given a primitive value, should return it JSON parsed', () => {
      spyOnLocalStorageGetItem.mockReturnValue('12345');
      expect(localStorageService.getItem('whatever')).toBe(12345);
    });
  });

  describe('setItem() method', () => {
    it('should call window.localStorage.setItem() method with stringified value', () => {
      localStorageService.setItem('auth', mockObject);
      expect(spyOnLocalStorageSetItem).toHaveBeenCalledTimes(1);
      expect(spyOnLocalStorageSetItem).toHaveBeenCalledWith(
        'auth',
        JSON.stringify(mockObject)
      );
    });
  });

  describe('removeItem() method', () => {
    it('should call window.localStorage.removeItem() method', () => {
      localStorageService.removeItem('auth');
      expect(spyOnLocalStorageRemoveItem).toHaveBeenCalledTimes(1);
      expect(spyOnLocalStorageRemoveItem).toHaveBeenCalledWith('auth');
    });
  });
});
