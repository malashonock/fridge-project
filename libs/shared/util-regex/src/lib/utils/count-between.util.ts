export const countBetween = (
  atom: string,
  min: number,
  max: number
): string => {
  return `${atom}{${min},${max}}`;
};
