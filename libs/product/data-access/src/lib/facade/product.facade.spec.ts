import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { ProductFacade } from './product.facade';

describe('ProductFacade', () => {
  let service: ProductFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
    });
    service = TestBed.inject(ProductFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
