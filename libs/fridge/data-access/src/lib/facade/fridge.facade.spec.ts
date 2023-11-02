import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { FridgeFacade } from './fridge.facade';

describe('FridgeFacade', () => {
  let service: FridgeFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
    });
    service = TestBed.inject(FridgeFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
