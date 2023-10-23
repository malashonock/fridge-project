import { oneOrMore } from './one-or-more.util';

describe('oneOrMore', () => {
  it('should apply + quantifier', () => {
    expect(oneOrMore('[A-Z]')).toBe('[A-Z]+');
  });
});
