import { getDecimalSeparator } from './i18n.utils';

describe('getDecimalSeparator function', () => {
  it('should return decimal separator for a given location', () => {
    expect(getDecimalSeparator('en-US')).toBe('.');
    expect(getDecimalSeparator('ru-RU')).toBe(',');
  });

  it('given an invalid locale, should return the decimal separator of the current locale', () => {
    const currentLocaleDecimalSeparator = (1.1)
      .toLocaleString()
      .substring(1, 2);
    expect(getDecimalSeparator('invalid-LOCALE')).toBe(
      currentLocaleDecimalSeparator
    );
  });
});
