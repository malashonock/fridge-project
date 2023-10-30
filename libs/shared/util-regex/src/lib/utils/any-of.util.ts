export const anyOf = (...charSets: string[]): string => {
  return `[${charSets.join('')}]`;
};
