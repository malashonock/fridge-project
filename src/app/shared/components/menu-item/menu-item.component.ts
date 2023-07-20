import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface MenuItemConfig {
  text: string;
  href?: string;
  matIconCode?: string;
}

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent {
  @Input() config!: MenuItemConfig;
}
