import { TestBed } from '@angular/core/testing';

import { initializeFridgesFactory } from './fridges.initializer';
import { FridgeFacade } from '../facade/fridge.facade';

describe('Fridges initializer', () => {
  const spyOnFridgeFacadeLoadFridges = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: FridgeFacade,
          useValue: { loadFridges: spyOnFridgeFacadeLoadFridges },
        },
      ],
    });
  });

  it('should call loadFridges() method on the fridge facade', (done) => {
    TestBed.runInInjectionContext(() => {
      initializeFridgesFactory();
      expect(spyOnFridgeFacadeLoadFridges).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
