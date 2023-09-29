import { countBetween } from './count-between.util';

describe('countBetween', () => {
  it('should apply {n,m} quantifier', () => {
    expect(countBetween('[A-Z]', 1, 3)).toBe('[A-Z]{1,3}');
  });
});
