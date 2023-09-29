import { anyOf } from './any-of.util';

describe('anyOf', () => {
  it('should return a character class', () => {
    expect(anyOf('A-Z')).toBe('[A-Z]');
  });
});
