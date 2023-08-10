import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TrackByFunction,
} from '@angular/core';

export interface MenuItemConfig {
  text: string;
  href?: string;
  matIconCode?: string;
}

export enum MenuItemVariant {
  Row = 'menu-item--row',
  Tile = 'menu-item--tile',
}

export const menuItemTrackBy: TrackByFunction<MenuItemConfig> = (
  index: number,
  menuItemConfig: MenuItemConfig
): string => {
  return menuItemConfig.text;
};

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent {
  @Input() public config: MenuItemConfig;
  @Input() public variant = MenuItemVariant.Row;
}
