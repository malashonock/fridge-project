import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';

import { BurgerButtonComponent } from './components/burger-button/burger-button.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { UserButtonComponent } from './components/user-button/user-button.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FixedHeaderDirective } from './directives/fixed-header/fixed-header.directive';
import { MobilePageDirective } from './directives/mobile-page/mobile-page.directive';
import { MobileMenuDirective } from './directives/mobile-menu/mobile-menu.directive';
import { InitialsPipe } from './pipes/initials/initials.pipe';

const materialModules = [
  MatIconModule,
  MatToolbarModule,
  MatMenuModule,
  MatSidenavModule,
];

@NgModule({
  declarations: [
    BurgerButtonComponent,
    HeaderComponent,
    LogoComponent,
    UserButtonComponent,
    LayoutComponent,
    FixedHeaderDirective,
    MobileMenuDirective,
    InitialsPipe,
  ],
  imports: [CommonModule, materialModules, MobilePageDirective],
  exports: [LayoutComponent],
})
export class LayoutModule {}
