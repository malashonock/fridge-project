import { TestBed } from '@angular/core/testing';

import { FridgeSharedLibService } from './fridge-shared-lib.service';

describe('FridgeSharedLibService', () => {
  let service: FridgeSharedLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FridgeSharedLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
