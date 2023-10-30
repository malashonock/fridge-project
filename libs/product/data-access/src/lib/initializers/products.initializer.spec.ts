import { TestBed } from '@angular/core/testing';

import { initializeProductsFactory } from './products.initializer';
import { ProductFacade } from '../facade/product.facade';

describe('Products initializer', () => {
  const spyOnProductFacadeLoadProducts = jest.fn();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ProductFacade,
          useValue: { loadProducts: spyOnProductFacadeLoadProducts },
        },
      ],
    });
  });

  it('should call loadProducts() method on the product facade', (done) => {
    TestBed.runInInjectionContext(() => {
      initializeProductsFactory();
      expect(spyOnProductFacadeLoadProducts).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
