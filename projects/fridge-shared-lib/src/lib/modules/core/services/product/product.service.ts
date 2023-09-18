import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../../../models/product/product.interface';
import { ProductFields } from '../../../../models/product/product-fields.interface';
import { WithId } from '../../../../models/id/with-id.interface';
import { FormDataService } from '../form-data/form-data.service';

@Injectable()
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

  public deleteProduct(id: string): Observable<WithId> {
    return this.httpClient.delete<WithId>(`/products/${id}`);
  }
}
