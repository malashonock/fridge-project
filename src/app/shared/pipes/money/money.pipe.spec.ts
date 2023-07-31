import { MoneyPipe } from './money.pipe';

describe('MoneyPipe', () => {
  let pipe: MoneyPipe;

  beforeEach(() => {
    pipe = new MoneyPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should present numbers in marketing notation, i.e. with cents as superscript', () => {
    expect(pipe.transform(2.99)).toBe(
      '<span class="dollars">2.</span><sup class="cents">99</sup>'
    );
  });
});
