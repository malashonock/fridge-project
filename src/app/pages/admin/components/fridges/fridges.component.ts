import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { Fridge } from 'core/models/fridge/fridge.interface';
import { selectAllFridges } from 'store/fridges/fridges.selectors';
import { FridgeFormComponent } from '../fridge-form/fridge-form.component';

@Component({
  selector: 'app-fridges',
  templateUrl: './fridges.component.html',
  styleUrls: ['./fridges.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FridgesComponent {
  public searchQuery$ = new Subject<string>();

  public constructor(private store: Store, private dialog: MatDialog) {}

  public get fridges$(): Observable<Fridge[]> {
    return this.store.select(selectAllFridges);
  }

  public onSearchQueryChange(query: string): void {
    this.searchQuery$.next(query);
  }

  public openAddFridgeDialog(): void {
    this.dialog.open(FridgeFormComponent);
  }
}
