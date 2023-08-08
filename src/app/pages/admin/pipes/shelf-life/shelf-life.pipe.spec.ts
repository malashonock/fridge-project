import { ShelfLife } from 'core/models';
import { ShelfLifePipe } from './shelf-life.pipe';

describe('PropsConcatPipe', () => {
  let pipe: ShelfLifePipe;

  beforeEach(() => {
    pipe = new ShelfLifePipe();
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

    expect(pipe.transform(shelfLife)).toBe('1m 2w 3d 4h');
  });

  it('should disregard null key-value pairs', () => {
    let shelfLife: ShelfLife = {
      months: null,
      weeks: null,
      days: 3,
      hours: 4,
    };
    expect(pipe.transform(shelfLife)).toBe('3d 4h');

    shelfLife = {
      months: null,
      weeks: null,
      days: null,
      hours: null,
    };
    expect(pipe.transform(shelfLife)).toBe('');
  });
});
