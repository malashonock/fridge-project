import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '@shared/models/product/product.interface';
import { ProductFields } from '@shared/models/product/product-fields.interface';
import { WithId } from '@shared/models/id/with-id.interface';
import { FormDataService } from '../form-data/form-data.service';
import { CoreModule } from '@shared/core/core.module';

@Injectable({
  providedIn: CoreModule,
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

  public deleteProduct(id: string): Observable<WithId> {
    return this.httpClient.delete<WithId>(`/products/${id}`);
  }
}
