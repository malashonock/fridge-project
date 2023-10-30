import { startWith } from './start-with.util';

describe('startWith', () => {
  it('should prepend ^', () => {
    expect(startWith('[A-Z]')).toBe('^[A-Z]');
  });
});
