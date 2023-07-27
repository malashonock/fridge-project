import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from 'core/models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public constructor(private httpClient: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('/products');
  }
}
