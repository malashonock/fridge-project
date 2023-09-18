import { InjectionToken, Provider } from '@angular/core';

import { MenuItemConfig } from 'fridge-shared-lib';

export const adminPageMenuConfig: MenuItemConfig[] = [
  {
    text: $localize`:@@products:Products`,
    href: 'products',
    matIconCode: 'fastfood',
  },
  {
    text: $localize`:@@fridges:Fridges`,
    href: 'fridges',
    matIconCode: 'kitchen',
  },
  { text: $localize`:@@map:Map`, href: 'map', matIconCode: 'map' },
];

export const ADMIN_PAGE_MENU_CONFIG = new InjectionToken<MenuItemConfig[]>(
  'ADMIN_PAGE_MENU_CONFIG'
);

export const adminPageMenuConfigProvider: Provider = {
  provide: ADMIN_PAGE_MENU_CONFIG,
  useValue: adminPageMenuConfig,
};
