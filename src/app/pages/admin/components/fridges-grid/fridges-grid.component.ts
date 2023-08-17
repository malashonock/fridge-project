import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Fridge } from 'core/models/fridge/fridge.interface';
import { Observable, combineLatest, map, startWith } from 'rxjs';

@Component({
  selector: 'app-fridges-grid',
  templateUrl: './fridges-grid.component.html',
  styleUrls: ['./fridges-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FridgesGridComponent implements OnInit {
  @Input() public fridges$: Observable<Fridge[]>;
  @Input() public searchQuery$: Observable<string>;

  public filteredFridges$: Observable<Fridge[]>;

  public ngOnInit(): void {
    this.filteredFridges$ = combineLatest([
      this.fridges$,
      this.searchQuery$?.pipe(
        map((searchQuery: string): string => {
          return searchQuery.trim().toLowerCase();
        })
      ),
    ]).pipe(
      map(([fridges, searchQuery]): Fridge[] => {
        return fridges.filter((fridge: Fridge): boolean => {
          return (
            fridge.description?.toLowerCase().includes(searchQuery) ||
            fridge.address?.country?.toLowerCase().includes(searchQuery) ||
            fridge.address?.city?.toLowerCase().includes(searchQuery) ||
            fridge.address?.street?.toLowerCase().includes(searchQuery) ||
            fridge.model.toLowerCase().includes(searchQuery)
          );
        });
      })
    );
  }
}
