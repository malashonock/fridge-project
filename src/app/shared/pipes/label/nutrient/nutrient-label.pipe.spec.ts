import { NutrientLabelPipe } from './nutrient-label.pipe';
import { Nutrient } from 'core/models/product/nutrient.enum';

describe('NutrientLabelPipe', () => {
  let pipe: NutrientLabelPipe;

  beforeEach(() => {
    pipe = new NutrientLabelPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return appropriate user role representations', () => {
    expect(pipe.transform(Nutrient.Proteins)).toBe('Proteins');
    expect(pipe.transform(Nutrient.Fats)).toBe('Fats');
    expect(pipe.transform(Nutrient.Carbs)).toBe('Carbs');
  });

  it('should support Genitive noun case', () => {
    expect(pipe.transform(Nutrient.Proteins, 'genitive')).toBe('Proteins');
    expect(pipe.transform(Nutrient.Fats, 'genitive')).toBe('Fats');
    expect(pipe.transform(Nutrient.Carbs, 'genitive')).toBe('Carbs');
  });
});
