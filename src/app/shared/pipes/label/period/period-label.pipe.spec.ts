import { PeriodLabelPipe } from './period-label.pipe';
import { Period } from 'core/models/product/period.enum';

describe('PeriodLabelPipe', () => {
  let pipe: PeriodLabelPipe;

  beforeEach(() => {
    pipe = new PeriodLabelPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return appropriate user role representations', () => {
    expect(pipe.transform(Period.Months)).toBe('Months');
    expect(pipe.transform(Period.Weeks)).toBe('Weeks');
    expect(pipe.transform(Period.Days)).toBe('Days');
    expect(pipe.transform(Period.Hours)).toBe('Hours');
  });

  it('should support Genitive noun case', () => {
    expect(pipe.transform(Period.Months, 'genitive')).toBe('Months');
    expect(pipe.transform(Period.Weeks, 'genitive')).toBe('Weeks');
    expect(pipe.transform(Period.Days, 'genitive')).toBe('Days');
    expect(pipe.transform(Period.Hours, 'genitive')).toBe('Hours');
  });
});
