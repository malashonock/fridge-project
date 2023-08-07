import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Id, Product, ProductFields } from 'core/models';
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
