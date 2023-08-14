import { UnitOfWeight } from 'core/models/product/unit-of-weight.enum';
import { WeightUnitPipe } from './weight-unit.pipe';

describe('WeightUnitPipe', () => {
  let pipe: WeightUnitPipe;

  beforeEach(() => {
    pipe = new WeightUnitPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return appropriate unit of weight representations', () => {
    expect(pipe.transform(UnitOfWeight.Grams)).toBe('g');
    expect(pipe.transform(UnitOfWeight.Milliliters)).toBe('ml');
  });
});
