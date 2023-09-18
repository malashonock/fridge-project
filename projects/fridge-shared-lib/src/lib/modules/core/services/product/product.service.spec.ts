import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProductService } from './product.service';
import { FormDataService } from '../form-data/form-data.service';
import {
  mockProduct1,
  mockProduct1Data,
  mockProducts1,
} from '../../../../mocks/product.mocks';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;
  const resourceUrl = '/products';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService, FormDataService],
    });

    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts() method', () => {
    it('should make a proper HTTP request', (done) => {
      service.getProducts().subscribe((response) => {
        expect(response).toEqual(mockProducts1);
        done();
      });

      const req = httpTestingController.expectOne(resourceUrl);

      req.flush(mockProducts1);
    });
  });

  describe('createProduct() method', () => {
    it('should make a proper HTTP request', (done) => {
      service.createProduct(mockProduct1Data).subscribe((response) => {
        expect(response).toEqual(mockProduct1);
        done();
      });

      const req = httpTestingController.expectOne(resourceUrl);

      req.flush(mockProduct1);
    });
  });

  describe('updateProduct() method', () => {
    it('should make a proper HTTP request', (done) => {
      service
        .updateProduct(mockProduct1.id, mockProduct1Data)
        .subscribe((response) => {
          expect(response).toEqual(mockProduct1);
          done();
        });

      const req = httpTestingController.expectOne(
        `${resourceUrl}/${mockProduct1.id}`
      );

      req.flush(mockProduct1);
    });
  });

  describe('deleteProduct() method', () => {
    it('should make a proper HTTP request', (done) => {
      service.deleteProduct(mockProduct1.id).subscribe((response) => {
        expect(response).toEqual({ id: mockProduct1.id });
        done();
      });

      const req = httpTestingController.expectOne(
        `${resourceUrl}/${mockProduct1.id}`
      );

      req.flush({ id: mockProduct1.id });
    });
  });
});
