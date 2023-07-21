import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectMobileMode } from 'app/state/ui/ui.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  mobileMode$: Observable<boolean>;

  constructor(private store: Store) {
    this.mobileMode$ = this.store.select(selectMobileMode);
  }
}
