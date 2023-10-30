import { zeroOrOne } from './zero-or-one.util';

describe('zeroOrOne', () => {
  it('should apply ? quantifier', () => {
    expect(zeroOrOne('[A-Z]')).toBe('[A-Z]?');
  });
});
