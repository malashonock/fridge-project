import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product, ProductFields } from 'product-domain';
import { WithId } from 'shared-data-access';
import { FormDataService } from 'shared-util-forms';

@Injectable({
  providedIn: 'root',
})
export class ProductRepository {
  public constructor(
    private httpClient: HttpClient,
    private formDataService: FormDataService
  ) {}

  public getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('/products');
  }

  public createProduct(productData: ProductFields): Observable<Product> {
    const formData = this.formDataService.buildFormData(productData);
    return this.httpClient.post<Product>('/products', formData);
  }

  public updateProduct(
    id: string,
    productData: ProductFields
  ): Observable<Product> {
    const formData = this.formDataService.buildFormData(productData);
    return this.httpClient.put<Product>(`/products/${id}`, formData);
  }

  public deleteProduct(id: string): Observable<WithId> {
    return this.httpClient.delete<WithId>(`/products/${id}`);
  }
}
