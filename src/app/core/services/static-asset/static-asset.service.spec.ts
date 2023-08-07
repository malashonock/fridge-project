import { TestBed } from '@angular/core/testing';

import { StaticAssetService } from './static-asset.service';

describe('StaticAssetService', () => {
  let service: StaticAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
