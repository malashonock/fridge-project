import { exactCount } from './exact-count.util';

describe('exactCount', () => {
  it('should apply {n} quantifier', () => {
    expect(exactCount('[A-Z]', 3)).toBe('[A-Z]{3}');
  });
});
