import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Fridge, FridgeFields } from 'fridge-domain';
import { FormDataService } from 'shared-util-forms';
import { WithId } from 'shared-data-access';

@Injectable()
export class FridgeRepository {
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
