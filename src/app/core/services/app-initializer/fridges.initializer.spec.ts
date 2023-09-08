import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

import { initializeFridgesFactory } from './fridges.initializer';
import { FridgesActions } from 'app/state/fridges/fridges.actions';

describe('Fridges initializer', () => {
  let mockStore: Store;
  let fridgesInitializer: () => void;
  const mockFetchFridgesAction = FridgesActions.fetchFridges();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
    });

    mockStore = TestBed.inject(Store);
    jest.spyOn(mockStore, 'dispatch');

    fridgesInitializer = initializeFridgesFactory(mockStore);
  });

  it('should dispatch a Fetch Fridges action', () => {
    fridgesInitializer();
    expect(mockStore.dispatch).toHaveBeenCalledWith(mockFetchFridgesAction);
  });
});
