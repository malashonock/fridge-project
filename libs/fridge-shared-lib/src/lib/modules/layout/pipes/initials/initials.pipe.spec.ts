import { InitialsPipe } from './initials.pipe';

describe('InitialsPipe', () => {
  it('should create an instance', () => {
    const pipe = new InitialsPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return initials for normal 2-word full names', () => {
    const pipe = new InitialsPipe();
    expect(pipe.transform('John Doe')).toBe('JD');
  });

  it('should return initials given less than 2 words', () => {
    const pipe = new InitialsPipe();
    expect(pipe.transform('Homer')).toBe('H');
  });

  it('given an empty string, should return empty string', () => {
    const pipe = new InitialsPipe();
    expect(pipe.transform('')).toBe('');
  });

  it('given a null, should return empty string', () => {
    const pipe = new InitialsPipe();
    expect(pipe.transform(null)).toBe('');
  });

  it('should trim leading & trailing spaces', () => {
    const pipe = new InitialsPipe();
    expect(pipe.transform('   John Doe   ')).toBe('JD');
    expect(pipe.transform('   ')).toBe('');
  });

  it('should trim inner spaces', () => {
    const pipe = new InitialsPipe();
    expect(pipe.transform('John   Doe')).toBe('JD');
    expect(pipe.transform('   John   Doe   ')).toBe('JD');
  });
});
