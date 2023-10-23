export const minCount = (atom: string, min: number): string => {
  return `${atom}{${min},}`;
};
