import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from 'core/models/product/product.interface';
import { ProductFields } from 'core/models/product/product-fields.interface';
import { Id } from 'core/models/id/id.interface';
import { FormDataService } from '../form-data/form-data.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
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

  public deleteProduct(id: string): Observable<Id> {
    return this.httpClient.delete<Id>(`/products/${id}`);
  }
}
