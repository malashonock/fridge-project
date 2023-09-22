import { AnyPipe } from './any.pipe';

describe('AnyPipe', () => {
  let pipe: AnyPipe;

  beforeEach(() => {
    pipe = new AnyPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('given a primitive value', () => {
    it('given the value is truthy, should return the value', () => {
      expect(pipe.transform(123)).toBe(123);
      expect(pipe.transform('abc')).toBe('abc');
      expect(pipe.transform(true)).toBe(true);
    });

    it('given the value is falsy, should return false', () => {
      expect(pipe.transform(0)).toBe(false);
      expect(pipe.transform('')).toBe(false);
      expect(pipe.transform(false)).toBe(false);
      expect(pipe.transform(NaN)).toBe(false);
      expect(pipe.transform(null)).toBe(false);
      expect(pipe.transform(undefined)).toBe(false);
    });
  });

  describe('given an array', () => {
    it('given a non-empty array, should return the array', () => {
      const array = [1, 2, 3];
      expect(pipe.transform(array)).toBe(array);
    });

    it('given an empty array, should return fase', () => {
      const array: number[] = [];
      expect(pipe.transform(array)).toBe(false);
    });
  });

  describe('given an plain JS object', () => {
    it('given the object has at least one truthy prop, should return the object', () => {
      const obj = {
        months: null,
        weeks: null,
        days: 2,
        hours: null,
      };

      expect(pipe.transform(obj)).toBe(obj);
    });

    it('given the object has all falsy props, should return false', () => {
      const obj = {
        months: null,
        weeks: null,
        days: null,
        hours: null,
      };

      expect(pipe.transform(obj)).toBe(false);
    });
  });
});
