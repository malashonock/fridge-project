import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Fridge, FridgeFields, ProductQuantity } from 'fridge-domain';

import {
  selectAllFridges,
  selectFridge,
  selectFridgeProducts,
  selectFridgeSubmitting,
} from '../state/fridges.selectors';
import { FridgesActions } from '../state/fridges.actions';

@Injectable({
  providedIn: 'root',
})
export class FridgeFacade {
  public constructor(private store: Store) {}

  public getAllFridges$(): Observable<Fridge[]> {
    return this.store.select(selectAllFridges);
  }

  public getFridge$(id: string): Observable<Fridge | undefined> {
    return this.store.select(selectFridge(id));
  }

  public getFridgeProducts$(
    fridgeId: string
  ): Observable<ProductQuantity[] | undefined> {
    return this.store.select(selectFridgeProducts(fridgeId));
  }

  public getFridgeSubmitting$(id: string | null): Observable<boolean> {
    return this.store.select(selectFridgeSubmitting(id));
  }

  public loadFridges(): void {
    this.store.dispatch(FridgesActions.fetchFridges());
  }

  public createFridge(fridgeData: FridgeFields): void {
    this.store.dispatch(FridgesActions.createFridge({ fridgeData }));
  }

  public updateFridge(id: string, fridgeData: FridgeFields): void {
    this.store.dispatch(FridgesActions.updateFridge({ id, fridgeData }));
  }

  public deleteFridge(id: string): void {
    this.store.dispatch(FridgesActions.deleteFridge({ id }));
  }
}
