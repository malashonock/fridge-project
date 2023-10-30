import { zeroOrMore } from './zero-or-more.util';

describe('zeroOrMore', () => {
  it('should apply * quantifier', () => {
    expect(zeroOrMore('[A-Z]')).toBe('[A-Z]*');
  });
});
