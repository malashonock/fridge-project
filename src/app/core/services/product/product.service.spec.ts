import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { ProductService } from './product.service';
import { Product, ProductCategory, UnitOfWeight } from 'core/models';

const mockProduct1: Product = {
  id: '5',
  name: 'Cold sandwich with ham',
  category: ProductCategory.Snacks,
  ingredients:
    'Harris bread wheat-bran, ham, mozzarella cheese, tomatoes, Chinese cabbage, parsley, mayonnaise',
  price: 6.9,
  weight: {
    value: 180,
    unit: UnitOfWeight.Grams,
  },
  nutrients: {
    protein: 14.4,
    fat: 21.6,
    carbs: 36.7,
  },
  kiloCalories: 396,
  shelfLife: '3d',
  imageUrl: '/images/sandwich-with-ham.png',
};

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
    const mockProducts: Product[] = [mockProduct1];

    const endpointUrl = '/products';

    it('should make a proper HTTP request', () => {
      service
        .getProducts()
        .subscribe((response) => expect(response).toEqual(mockProducts));

      const req = httpTestingController.expectOne(endpointUrl);

      req.flush(mockProducts);
    });
  });
});
