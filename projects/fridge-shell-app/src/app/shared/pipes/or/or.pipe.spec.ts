import { OrPipe } from './or.pipe';

describe('OrPipe', () => {
  let pipe: OrPipe;

  beforeEach(() => {
    pipe = new OrPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('given a null or undefined value, should return the fallback arg', () => {
    expect(pipe.transform(null, 1)).toBe(1);
    expect(pipe.transform(undefined, 1)).toBe(1);
  });

  it('given other value, should return the value', () => {
    expect(pipe.transform(2, 1)).toBe(2);
    expect(pipe.transform('abc', 1)).toBe('abc');
    expect(pipe.transform('', 1)).toBe('');
    expect(pipe.transform(true, 1)).toBe(true);
    expect(pipe.transform(false, 1)).toBe(false);
    expect(pipe.transform([], 1)).toEqual([]);
    expect(pipe.transform({}, 1)).toEqual({});
  });
});
