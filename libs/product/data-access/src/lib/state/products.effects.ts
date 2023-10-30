import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { Product } from 'product-domain';
import { WithId } from 'shared-data-access';

import { ProductRepository } from '../repository/product.repository';
import { ProductsActions } from './products.actions';

@Injectable()
export class ProductsEffects {
  public constructor(
    private actions$: Actions,
    private productRepository: ProductRepository
  ) {}

  public fetchProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.fetchProducts),
      switchMap(() => {
        return this.productRepository.getProducts().pipe(
          map((products: Product[]) => {
            return ProductsActions.fetchProductsSuccess({ products });
          }),
          catchError((error) => {
            return of(
              ProductsActions.fetchProductsFailure({ error: error.message })
            );
          })
        );
      })
    );
  });

  public createProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.createProduct),
      switchMap(
        ({ productData }: ReturnType<typeof ProductsActions.createProduct>) => {
          return this.productRepository.createProduct(productData).pipe(
            map((product: Product) => {
              return ProductsActions.createProductSuccess({ product });
            }),
            catchError((error) => {
              return of(
                ProductsActions.createProductFailure({ error: error.message })
              );
            })
          );
        }
      )
    );
  });

  public updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.updateProduct),
      switchMap(
        ({
          id,
          productData,
        }: ReturnType<typeof ProductsActions.updateProduct>) => {
          return this.productRepository.updateProduct(id, productData).pipe(
            map((product: Product) => {
              return ProductsActions.updateProductSuccess({ product });
            }),
            catchError((error) => {
              return of(
                ProductsActions.updateProductFailure({
                  id,
                  error: error.message,
                })
              );
            })
          );
        }
      )
    );
  });

  public deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.deleteProduct),
      switchMap(({ id }: ReturnType<typeof ProductsActions.deleteProduct>) => {
        return this.productRepository.deleteProduct(id).pipe(
          map(({ id }: WithId) => {
            return ProductsActions.deleteProductSuccess({ id });
          }),
          catchError((error) => {
            return of(
              ProductsActions.deleteProductFailure({ id, error: error.message })
            );
          })
        );
      })
    );
  });

  public submitCreateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.createProduct),
      map(() => {
        return ProductsActions.submit({ id: null });
      })
    );
  });

  public submitUpdateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.updateProduct),
      map(({ id }: ReturnType<typeof ProductsActions.updateProduct>) => {
        return ProductsActions.submit({ id });
      })
    );
  });

  public submitDeleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.deleteProduct),
      map(({ id }: ReturnType<typeof ProductsActions.deleteProduct>) => {
        return ProductsActions.submit({ id });
      })
    );
  });

  public submitCreateProductSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.createProductSuccess),
      map(() => {
        return ProductsActions.submitSuccess({ id: null });
      })
    );
  });

  public submitUpdateProductSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.updateProductSuccess),
      map(
        ({
          product,
        }: ReturnType<typeof ProductsActions.updateProductSuccess>) => {
          return ProductsActions.submitSuccess({ id: product.id });
        }
      )
    );
  });

  public submitDeleteProductSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.deleteProductSuccess),
      map(({ id }: ReturnType<typeof ProductsActions.deleteProductSuccess>) => {
        return ProductsActions.submitSuccess({ id });
      })
    );
  });

  public submitCreateProductFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.createProductFailure),
      map(({ error }) => {
        return ProductsActions.submitFailure({ id: null, error });
      })
    );
  });

  public submitUpdateProductFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.updateProductFailure),
      map(({ id, error }) => {
        return ProductsActions.submitFailure({ id, error });
      })
    );
  });

  public submitDeleteProductFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.deleteProductFailure),
      map(({ id, error }) => {
        return ProductsActions.submitFailure({ id, error });
      })
    );
  });
}
