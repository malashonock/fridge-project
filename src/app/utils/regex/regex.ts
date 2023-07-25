export const anyOf = (...charSets: string[]): string => {
  return `[${charSets.join('')}]`;
};

export const group = (subpattern: string): string => {
  return `(${subpattern})`;
};

export const oneOrMore = (atom: string): string => {
  return `${atom}+`;
};

export const zeroOrMore = (atom: string): string => {
  return `${atom}*`;
};

export const zeroOrOne = (atom: string): string => {
  return `${atom}?`;
};

export const exactCount = (atom: string, count: number): string => {
  return `${atom}{${count}}`;
};

export const minCount = (atom: string, min: number): string => {
  return `${atom}{${min},}`;
};

export const countBetween = (
  atom: string,
  min: number,
  max: number
): string => {
  return `${atom}{${min},${max}}`;
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
