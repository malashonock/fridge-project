import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Fridge } from '../../../../models/fridge/fridge.interface';
import { FridgeFields } from '../../../../models/fridge/fridge-fields.interface';
import { FormDataService } from '../form-data/form-data.service';
import { WithId } from '../../../../models/id/with-id.interface';

@Injectable()
export class FridgeService {
  public constructor(
    private httpClient: HttpClient,
    private formDataService: FormDataService
  ) {}

  public getFridges(): Observable<Fridge[]> {
    return this.httpClient.get<Fridge[]>('/fridges');
  }

  public createFridge(fridgeData: FridgeFields): Observable<Fridge> {
    const formData = this.formDataService.buildFormData(fridgeData);
    return this.httpClient.post<Fridge>('/fridges', formData);
  }

  public updateFridge(
    id: string,
    fridgeData: FridgeFields
  ): Observable<Fridge> {
    const formData = this.formDataService.buildFormData(fridgeData);
    return this.httpClient.put<Fridge>(`/fridges/${id}`, formData);
  }

  public deleteFridge(id: string): Observable<WithId> {
    return this.httpClient.delete<WithId>(`/fridges/${id}`);
  }
}
