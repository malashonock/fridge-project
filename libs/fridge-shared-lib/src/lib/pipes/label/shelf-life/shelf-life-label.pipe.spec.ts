import '@angular/localize/init';

import { ShelfLife } from '../../../models/product/shelf-life.type';
import { ShelfLifeLabelPipe } from './shelf-life-label.pipe';

describe('ShelfLifeLabelPipe', () => {
  let pipe: ShelfLifeLabelPipe;

  beforeEach(() => {
    pipe = new ShelfLifeLabelPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it("should stringify object's key-value pairs and generate a comma-separated string", () => {
    const shelfLife: ShelfLife = {
      months: 1,
      weeks: 2,
      days: 3,
      hours: 4,
    };

    expect(pipe.transform(shelfLife)).toBe('1 mo, 2 wk, 3 d, 4 h');
  });

  it('should disregard null key-value pairs', () => {
    let shelfLife: ShelfLife = {
      months: null,
      weeks: null,
      days: 3,
      hours: 4,
    };
    expect(pipe.transform(shelfLife)).toBe('3 d, 4 h');

    shelfLife = {
      months: null,
      weeks: null,
      days: null,
      hours: null,
    };
    expect(pipe.transform(shelfLife)).toBe('');
  });
});
