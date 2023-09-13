import { KeysPipe } from './keys.pipe';

describe('KeysPipe', () => {
  let pipe: KeysPipe;

  beforeEach(() => {
    pipe = new KeysPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return Object.keys() of the passed object argument', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    expect(pipe.transform(obj)).toEqual(['a', 'b', 'c']);
  });
});
