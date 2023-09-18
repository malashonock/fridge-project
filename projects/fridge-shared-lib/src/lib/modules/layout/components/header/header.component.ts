import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectMobileMode } from '../../../../modules/core/store/ui/ui.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public mobileMode$ = this.store.select(selectMobileMode);

  public constructor(private store: Store) {}
}
