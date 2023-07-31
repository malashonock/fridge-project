import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { ProductService } from './product.service';
import { mockProducts1 } from 'mocks/product.mocks';

describe('ProductService', () => {
  let service: ProductService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ProductService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts() method', () => {
    const endpointUrl = '/products';

    it('should make a proper HTTP request', () => {
      service
        .getProducts()
        .subscribe((response) => expect(response).toEqual(mockProducts1));

      const req = httpTestingController.expectOne(endpointUrl);

      req.flush(mockProducts1);
    });
  });
});
