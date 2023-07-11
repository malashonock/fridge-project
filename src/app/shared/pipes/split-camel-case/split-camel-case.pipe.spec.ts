import { SplitCamelCasePipe } from './split-camel-case.pipe';

describe('SplitCamelCasePipe', () => {
  let pipe: SplitCamelCasePipe;

  beforeEach(() => {
    pipe = new SplitCamelCasePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('given an empty string, should return empty string', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should split a camelCasePhrase into separate words', () => {
    expect(pipe.transform('camelCasePhrase')).toBe('camel Case Phrase');
  });

  it('should ignore spaces and special characters', () => {
    expect(pipe.transform('Hello, world!')).toBe('Hello, world!');
  });
});
