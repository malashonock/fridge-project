import {
  anyOf,
  countBetween,
  endWith,
  exactCount,
  group,
  minCount,
  oneOrMore,
  startWith,
  zeroOrMore,
  zeroOrOne,
} from './regex';

describe('Regex utils', () => {
  describe('anyOf', () => {
    it('should return a character class', () => {
      expect(anyOf('A-Z')).toBe('[A-Z]');
    });
  });

  describe('group', () => {
    it('should return a capturing group', () => {
      expect(group('[A-Z]+')).toBe('([A-Z]+)');
    });
  });

  describe('oneOrMore', () => {
    it('should apply + quantifier', () => {
      expect(oneOrMore('[A-Z]')).toBe('[A-Z]+');
    });
  });

  describe('zeroOrMore', () => {
    it('should apply * quantifier', () => {
      expect(zeroOrMore('[A-Z]')).toBe('[A-Z]*');
    });
  });

  describe('zeroOrOne', () => {
    it('should apply ? quantifier', () => {
      expect(zeroOrOne('[A-Z]')).toBe('[A-Z]?');
    });
  });

  describe('exactCount', () => {
    it('should apply {n} quantifier', () => {
      expect(exactCount('[A-Z]', 3)).toBe('[A-Z]{3}');
    });
  });

  describe('minCount', () => {
    it('should apply {n} quantifier', () => {
      expect(minCount('[A-Z]', 3)).toBe('[A-Z]{3,}');
    });
  });

  describe('countBetween', () => {
    it('should apply {n,m} quantifier', () => {
      expect(countBetween('[A-Z]', 1, 3)).toBe('[A-Z]{1,3}');
    });
  });

  describe('startWith', () => {
    it('should prepend ^', () => {
      expect(startWith('[A-Z]')).toBe('^[A-Z]');
    });
  });

  describe('endWith', () => {
    it('should append $', () => {
      expect(endWith('[A-Z]')).toBe('[A-Z]$');
    });
  });
});
