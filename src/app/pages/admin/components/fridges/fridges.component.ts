import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { Fridge } from 'core/models/fridge/fridge.interface';
import { selectAllFridges } from 'app/state/fridges/fridges.selectors';

@Component({
  selector: 'app-fridges',
  templateUrl: './fridges.component.html',
  styleUrls: ['./fridges.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FridgesComponent implements OnDestroy {
  public searchQuery$ = new Subject<string>();
  private destroy$ = new Subject();

  public constructor(private store: Store, private dialog: MatDialog) {}

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public get fridges$(): Observable<Fridge[]> {
    return this.store.select(selectAllFridges);
  }

  public onSearchQueryChange(query: string): void {
    this.searchQuery$.next(query);
  }

  public openAddFridgeDialog(): void {
    // this.dialog.open(FridgeFormComponent);
  }
}
