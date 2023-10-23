import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { Fridge } from 'fridge-domain';
import { selectAllFridges } from 'fridge-data-access';
import { FridgeFormComponent } from 'fridge-feature-form';

@Component({
  selector: 'lib-fridges',
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
