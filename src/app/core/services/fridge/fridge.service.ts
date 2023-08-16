import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Fridge } from 'core/models/fridge/fridge.interface';

@Injectable({
  providedIn: 'root',
})
export class FridgeService {
  public constructor(private httpClient: HttpClient) {}

  public getFridges(): Observable<Fridge[]> {
    return this.httpClient.get<Fridge[]>('/fridges');
  }
}
