import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Optional,
  SkipSelf,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

export interface MenuItemConfig {
  text: string;
  href?: string;
  matIconCode?: string;
}

export enum MenuItemVariant {
  Row = 'menu-item--row',
  Tile = 'menu-item--tile',
}

const materialModules = [MatIconModule, MatMenuModule];

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, materialModules],
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