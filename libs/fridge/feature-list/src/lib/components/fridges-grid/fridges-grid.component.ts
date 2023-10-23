import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Fridge } from 'fridge-domain';

@Component({
  selector: 'lib-fridges-grid',
  templateUrl: './fridges-grid.component.html',
  styleUrls: ['./fridges-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FridgesGridComponent {
  @Input() public fridges: Fridge[] = [];
  @Input() public searchQuery = '';

  public get filteredFridges(): Fridge[] {
    return this.fridges.filter((fridge: Fridge): boolean => {
      return (
        fridge.description?.toLowerCase().includes(this.searchQuery) ||
        fridge.address?.country?.toLowerCase().includes(this.searchQuery) ||
        fridge.address?.city?.toLowerCase().includes(this.searchQuery) ||
        fridge.address?.street?.toLowerCase().includes(this.searchQuery) ||
        fridge.model.toLowerCase().includes(this.searchQuery)
      );
    });
  }
}
