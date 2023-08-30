import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Optional,
  SkipSelf,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

export interface MenuItemConfig {
  text: string;
  href?: string;
  matIconCode?: string;
}

export enum MenuItemVariant {
  Row = 'menu-item--row',
  Tile = 'menu-item--tile',
}

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent {
  @Input() public config: MenuItemConfig;
  @Input() public variant = MenuItemVariant.Row;

  public constructor(@Optional() @SkipSelf() private hostMenu?: MatSidenav) {}

  public closeHostMenu(): void {
    if (this.hostMenu && !this.hostMenu.disableClose) {
      this.hostMenu.close();
    }
  }
}
