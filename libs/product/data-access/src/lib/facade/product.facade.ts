import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Product, ProductFields } from 'product-domain';

import {
  selectAllProducts,
  selectProductSubmitting,
} from '../state/products.selectors';
import { ProductsActions } from '../state/products.actions';

@Injectable({
  providedIn: 'root',
})
export class ProductFacade {
  public constructor(private store: Store) {}

  public getAllProducts$(): Observable<Product[]> {
    return this.store.select(selectAllProducts);
  }

  public getProductSubmitting$(id: string | null): Observable<boolean> {
    return this.store.select(selectProductSubmitting(id));
  }

  public loadProducts(): void {
    this.store.dispatch(ProductsActions.fetchProducts());
  }

  public createProduct(productData: ProductFields): void {
    this.store.dispatch(ProductsActions.createProduct({ productData }));
  }

  public updateProduct(id: string, productData: ProductFields): void {
    this.store.dispatch(ProductsActions.updateProduct({ id, productData }));
  }

  public deleteProduct(id: string): void {
    this.store.dispatch(ProductsActions.deleteProduct({ id }));
  }
}
