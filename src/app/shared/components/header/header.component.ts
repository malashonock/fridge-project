import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectMobileMode } from 'app/state/ui';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public mobileMode$: Observable<boolean>;

  public constructor(private store: Store) {
    this.mobileMode$ = this.store.select(selectMobileMode);
  }
}
