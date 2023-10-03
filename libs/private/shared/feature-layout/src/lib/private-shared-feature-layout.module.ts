import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MenuItemComponent } from 'shared-ui';

import { BurgerButtonComponent } from './components/burger-button/burger-button.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LogoComponent } from './components/logo/logo.component';
import { UserButtonComponent } from './components/user-button/user-button.component';
import { FixedHeaderDirective } from './directives/fixed-header/fixed-header.directive';
import { MobileMenuDirective } from './directives/mobile-menu/mobile-menu.directive';
import { InitialsPipe } from './pipes/initials/initials.pipe';

const materialModules = [
  MatIconModule,
  MatToolbarModule,
  MatMenuModule,
  MatSidenavModule,
  MatButtonModule,
];

@NgModule({
  declarations: [
    BurgerButtonComponent,
    HeaderComponent,
    LogoComponent,
    UserButtonComponent,
    FixedHeaderDirective,
    MobileMenuDirective,
    InitialsPipe,
    LayoutComponent,
  ],
  imports: [CommonModule, materialModules, RouterModule, MenuItemComponent],
  exports: [LayoutComponent],
})
export class PrivateSharedFeatureLayoutModule {}
