import { TrackByFunction } from '@angular/core';

import { MenuItemConfig } from 'shared/components/menu-item/menu-item.component';

export const menuItemTrackBy: TrackByFunction<MenuItemConfig> = (
  index: number,
  menuItemConfig: MenuItemConfig
): string => {
  return menuItemConfig.text;
};
