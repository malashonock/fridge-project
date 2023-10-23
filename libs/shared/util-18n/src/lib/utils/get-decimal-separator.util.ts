export const getDecimalSeparator = (locale: string): string => {
  const testNumber = 1.1;
  return (
    Intl.NumberFormat(locale)
      .formatToParts(testNumber)
      .find(({ type }: Intl.NumberFormatPart): boolean => type === 'decimal')
      ?.value || '.'
  );
};
