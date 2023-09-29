import { endWith } from './end-with.util';

describe('endWith', () => {
  it('should append $', () => {
    expect(endWith('[A-Z]')).toBe('[A-Z]$');
  });
});
