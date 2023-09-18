import '@angular/localize/init';

import { UnitOfWeight } from '../../../models/product/unit-of-weight.enum';
import { WeightUnitLabelPipe } from './weight-unit-label.pipe';

describe('WeightUnitLabelPipe', () => {
  let pipe: WeightUnitLabelPipe;

  beforeEach(() => {
    pipe = new WeightUnitLabelPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return appropriate unit of weight representations', () => {
    expect(pipe.transform(UnitOfWeight.Grams)).toBe('g');
    expect(pipe.transform(UnitOfWeight.Milliliters)).toBe('ml');
  });
});
