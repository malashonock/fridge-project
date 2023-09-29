import { minCount } from './min-count.util';

describe('minCount', () => {
  it('should apply {n} quantifier', () => {
    expect(minCount('[A-Z]', 3)).toBe('[A-Z]{3,}');
  });
});
