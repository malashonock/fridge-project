import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';

import { Fridge } from 'fridge-domain';
import { FridgeFacade } from 'fridge-data-access';
import { FridgeFormComponent } from 'fridge-feature-form';

@Component({
  selector: 'lib-fridges',
  templateUrl: './fridges.component.html',
  styleUrls: ['./fridges.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FridgesComponent {
  private searchQuery = new Subject<string>();
  public searchQuery$ = this.searchQuery.asObservable();

  public constructor(
    private fridgeFacade: FridgeFacade,
    private dialog: MatDialog
  ) {}

  public get fridges$(): Observable<Fridge[]> {
    return this.fridgeFacade.getAllFridges$();
  }

  public onSearchQueryChange(query: string): void {
    this.searchQuery.next(query);
  }

  public openAddFridgeDialog(): void {
    this.dialog.open(FridgeFormComponent);
  }
}
