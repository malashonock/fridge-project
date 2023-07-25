import { SentenceCasePipe } from './sentence-case.pipe';

describe('SentenceCasePipe', () => {
  let pipe: SentenceCasePipe;

  beforeEach(() => {
    pipe = new SentenceCasePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('given an empty string, should return empty string', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('given the 1st letter is lowercase, should capitalize only the 1st letter', () => {
    expect(pipe.transform('hello, world!')).toBe('Hello, world!');
  });

  it('given the 1st letter is uppercase, should not change anything', () => {
    expect(pipe.transform('Hello, world!')).toBe('Hello, world!');
  });
});
