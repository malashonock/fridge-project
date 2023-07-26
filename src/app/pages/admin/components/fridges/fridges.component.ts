import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-fridges',
  templateUrl: './fridges.component.html',
  styleUrls: ['./fridges.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FridgesComponent {}
