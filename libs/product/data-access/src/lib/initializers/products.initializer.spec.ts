import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

import { ProductsActions } from '../state/products.actions';
import { initializeProductsFactory } from './products.initializer';

describe('Products initializer', () => {
  let mockStore: Store;
  let productsInitializer: () => void;
  const mockFetchProductsAction = ProductsActions.fetchProducts();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
    });

    mockStore = TestBed.inject(Store);
    jest.spyOn(mockStore, 'dispatch');

    productsInitializer = initializeProductsFactory(mockStore);
  });

  it('should dispatch a Fetch Products action', () => {
    productsInitializer();
    expect(mockStore.dispatch).toHaveBeenCalledWith(mockFetchProductsAction);
  });
});
