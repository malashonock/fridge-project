import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { FridgeService } from './fridge.service';
import { FormDataService } from '../form-data/form-data.service';
import {
  mockFridge1,
  mockFridge1Data,
  mockFridges1,
} from '../../../../mocks/fridge.mocks';

describe('FridgeService', () => {
  let service: FridgeService;
  let httpTestingController: HttpTestingController;
  const resourceUrl = '/fridges';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FridgeService, FormDataService],
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

  describe('createFridge() method', () => {
    it('should make a proper HTTP request', (done) => {
      service.createFridge(mockFridge1Data).subscribe((response) => {
        expect(response).toEqual(mockFridge1);
        done();
      });

      const req = httpTestingController.expectOne(resourceUrl);

      req.flush(mockFridge1);
    });
  });

  describe('updateFridge() method', () => {
    it('should make a proper HTTP request', (done) => {
      service
        .updateFridge(mockFridge1.id, mockFridge1Data)
        .subscribe((response) => {
          expect(response).toEqual(mockFridge1);
          done();
        });

      const req = httpTestingController.expectOne(
        `${resourceUrl}/${mockFridge1.id}`
      );

      req.flush(mockFridge1);
    });
  });

  describe('deleteFridge() method', () => {
    it('should make a proper HTTP request', (done) => {
      service.deleteFridge(mockFridge1.id).subscribe((response) => {
        expect(response).toEqual({ id: mockFridge1.id });
        done();
      });

      const req = httpTestingController.expectOne(
        `${resourceUrl}/${mockFridge1.id}`
      );

      req.flush({ id: mockFridge1.id });
    });
  });
});
