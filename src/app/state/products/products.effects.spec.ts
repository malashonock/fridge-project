import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jest-marbles';

import { ProductsEffects } from './products.effects';
import { CoreModule } from 'core/core.module';
import { ProductService } from 'core/services';
import { ProductsActions } from './products.actions';
import {
  mockProduct1,
  mockProduct1Data,
  mockProducts1,
} from 'mocks/product.mocks';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Products feature effects', () => {
  let actions$ = new Observable<Action>();
  let productEffects: ProductsEffects;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, HttpClientTestingModule],
      providers: [ProductsEffects, provideMockActions(() => actions$)],
    });

    productService = TestBed.inject(ProductService);
    productEffects = TestBed.inject(ProductsEffects);
  });

  describe('fetchProducts$ effect', () => {
    it('should react only to fetchProducts action', () => {
      actions$ = hot('-a-', {
        a: ProductsActions.createProduct({ productData: mockProduct1Data }),
      });

      const expected = hot('---', {});

      expect(productEffects.fetchProducts$).toBeObservable(expected);
    });

    it('given products service returns a valid payload, should trigger a fetchProductsSuccess action', () => {
      actions$ = hot('-a-', {
        a: ProductsActions.fetchProducts(),
      });

      jest.spyOn(productService, 'getProducts').mockReturnValue(
        cold('--b|', {
          b: mockProducts1,
        })
      );

      const expected = hot('---c', {
        c: ProductsActions.fetchProductsSuccess({ products: mockProducts1 }),
      });

      expect(productEffects.fetchProducts$).toBeObservable(expected);
    });

    it('given products service returns an error, should trigger a fetchProductsFailure action', () => {
      actions$ = hot('-a-', {
        a: ProductsActions.fetchProducts(),
      });

      jest
        .spyOn(productService, 'getProducts')
        .mockReturnValue(cold('--#|', {}, new Error('Server error')));

      const expected = hot('---c', {
        c: ProductsActions.fetchProductsFailure({ error: 'Server error' }),
      });

      expect(productEffects.fetchProducts$).toBeObservable(expected);
    });
  });

  describe('createProduct$ effect', () => {
    it('should react only to createProduct action', () => {
      actions$ = hot('-a-', {
        a: ProductsActions.fetchProducts(),
      });

      const expected = hot('---', {});

      expect(productEffects.createProduct$).toBeObservable(expected);
    });

    it('given products service returns a valid payload, should trigger a createProductSuccess action', () => {
      actions$ = hot('-a-', {
        a: ProductsActions.createProduct({ productData: mockProduct1Data }),
      });

      jest.spyOn(productService, 'createProduct').mockReturnValue(
        cold('--b|', {
          b: mockProduct1,
        })
      );

      const expected = hot('---c', {
        c: ProductsActions.createProductSuccess({ product: mockProduct1 }),
      });

      expect(productEffects.createProduct$).toBeObservable(expected);
    });

    it('given products service returns an error, should trigger a createProductFailure action', () => {
      actions$ = hot('-a-', {
        a: ProductsActions.createProduct({ productData: mockProduct1Data }),
      });

      jest
        .spyOn(productService, 'createProduct')
        .mockReturnValue(cold('--#|', {}, new Error('Server error')));

      const expected = hot('---c', {
        c: ProductsActions.createProductFailure({ error: 'Server error' }),
      });

      expect(productEffects.createProduct$).toBeObservable(expected);
    });
  });

  describe('updateProduct$ effect', () => {
    it('should react only to updateProduct action', () => {
      actions$ = hot('-a-', {
        a: ProductsActions.fetchProducts(),
      });

      const expected = hot('---', {});

      expect(productEffects.updateProduct$).toBeObservable(expected);
    });

    it('given products service returns a valid payload, should trigger a updateProductSuccess action', () => {
      actions$ = hot('-a-', {
        a: ProductsActions.updateProduct({
          id: mockProduct1.id,
          productData: mockProduct1Data,
        }),
      });

      jest.spyOn(productService, 'updateProduct').mockReturnValue(
        cold('--b|', {
          b: mockProduct1,
        })
      );

      const expected = hot('---c', {
        c: ProductsActions.updateProductSuccess({ product: mockProduct1 }),
      });

      expect(productEffects.updateProduct$).toBeObservable(expected);
    });

    it('given products service returns an error, should trigger a updateProductFailure action', () => {
      actions$ = hot('-a-', {
        a: ProductsActions.updateProduct({
          id: mockProduct1.id,
          productData: mockProduct1Data,
        }),
      });

      jest
        .spyOn(productService, 'updateProduct')
        .mockReturnValue(cold('--#|', {}, new Error('Server error')));

      const expected = hot('---c', {
        c: ProductsActions.updateProductFailure({ error: 'Server error' }),
      });

      expect(productEffects.updateProduct$).toBeObservable(expected);
    });
  });

  describe('deleteProduct$ effect', () => {
    it('should react only to deleteProduct action', () => {
      actions$ = hot('-a-', {
        a: ProductsActions.fetchProducts(),
      });

      const expected = hot('---', {});

      expect(productEffects.deleteProduct$).toBeObservable(expected);
    });

    it('given products service returns a valid payload, should trigger a deleteProductSuccess action', () => {
      actions$ = hot('-a-', {
        a: ProductsActions.deleteProduct({
          id: mockProduct1.id,
        }),
      });

      jest.spyOn(productService, 'deleteProduct').mockReturnValue(
        cold('--b|', {
          b: mockProduct1,
        })
      );

      const expected = hot('---c', {
        c: ProductsActions.deleteProductSuccess({ id: mockProduct1.id }),
      });

      expect(productEffects.deleteProduct$).toBeObservable(expected);
    });

    it('given products service returns an error, should trigger a deleteProductFailure action', () => {
      actions$ = hot('-a-', {
        a: ProductsActions.deleteProduct({
          id: mockProduct1.id,
        }),
      });

      jest
        .spyOn(productService, 'deleteProduct')
        .mockReturnValue(cold('--#|', {}, new Error('Server error')));

      const expected = hot('---c', {
        c: ProductsActions.deleteProductFailure({ error: 'Server error' }),
      });

      expect(productEffects.deleteProduct$).toBeObservable(expected);
    });
  });
});
