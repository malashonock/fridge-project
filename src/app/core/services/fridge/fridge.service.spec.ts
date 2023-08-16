import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { FridgeService } from './fridge.service';
import { mockFridges1 } from 'mocks/fridge.mocks';

describe('FridgeService', () => {
  let service: FridgeService;
  let httpTestingController: HttpTestingController;
  const resourceUrl = '/fridges';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(FridgeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFridges() method', () => {
    it('should make a proper HTTP request', (done) => {
      service.getFridges().subscribe((response) => {
        expect(response).toEqual(mockFridges1);
        done();
      });

      const req = httpTestingController.expectOne(resourceUrl);

      req.flush(mockFridges1);
    });
  });
});
