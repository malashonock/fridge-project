export const anyOf = (...charSequences: string[]): string => {
  return `[${charSequences.join('')}]`;
};

export const group = (regex: string): string => {
  return `(${regex})`;
};

export const oneOrMore = (regex: string): string => {
  return `${regex}+`;
};

export const zeroOrMore = (regex: string): string => {
  return `${regex}*`;
};

export const exactCount = (regex: string, count: number): string => {
  return `${regex}{${count}}`;
};

export const minCount = (regex: string, min: number): string => {
  return `${regex}{${min},}`;
};

export const countBetween = (
  regex: string,
  min: number,
  max: number
): string => {
  return `${regex}{${min},${max}}`;
};

export const zeroOrOne = (regex: string): string => {
  return countBetween(regex, 0, 1);
};

export const startWith = (regex: string): string => {
  return `^${regex}`;
};

export const endWith = (regex: string): string => {
  return `${regex}$`;
};

export default {
  anyOf,
  group,
  oneOrMore,
  zeroOrMore,
  zeroOrOne,
  exactCount,
  minCount,
  countBetween,
  startWith,
  endWith,
};
