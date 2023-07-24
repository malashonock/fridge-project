import { Component } from '@angular/core';

import {
  MenuItemConfig,
  MenuItemVariant,
} from 'app/shared/components/menu-item/menu-item.component';
import { adminPageMenuConfig } from '../../admin.menu-config';

@Component({
  selector: 'app-admin-index',
  templateUrl: './admin-index.component.html',
  styleUrls: ['./admin-index.component.scss'],
})
export class AdminIndexComponent {
  MenuItemVariant = MenuItemVariant;
  menuConfig: MenuItemConfig[] = adminPageMenuConfig;
}
