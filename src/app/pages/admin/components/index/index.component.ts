import { Component } from '@angular/core';

import { MenuItemConfig } from 'app/shared/components/menu-item/menu-item.component';
import { adminPageMenuConfig } from '../../admin.menu-config';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent {
  menuConfig: MenuItemConfig[] = adminPageMenuConfig;
}
