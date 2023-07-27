import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { ProductService } from 'core/services';
import { ProductsActions } from './products.actions';
import { Product } from 'core/models';

@Injectable()
export class ProductsEffects {
  public constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  public fetchProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.fetchProducts),
      switchMap(() => {
        return this.productService.getProducts().pipe(
          map((products: Product[]) => {
            return ProductsActions.fetchProductsSuccess({ products });
          }),
          catchError((error) => {
            return of(
              ProductsActions.fetchProductsError({ error: error.message })
            );
          })
        );
      })
    );
  });
}
