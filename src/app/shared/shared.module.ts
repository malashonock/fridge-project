import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SentenceCasePipe } from './pipes/sentence-case/sentence-case.pipe';
import { SplitCamelCasePipe } from './pipes/split-camel-case/split-camel-case.pipe';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { UserButtonComponent } from './components/user-button/user-button.component';
import { InitialsPipe } from './pipes/initials/initials.pipe';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { BurgerButtonComponent } from './components/burger-button/burger-button.component';
import { MobileMenuDirective } from './directives/mobile/menu/mobile-menu.directive';
import { FixedHeaderDirective } from './directives/fixed-header/fixed-header.directive';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    SentenceCasePipe,
    SplitCamelCasePipe,
    HeaderComponent,
    LogoComponent,
    UserButtonComponent,
    InitialsPipe,
    MenuItemComponent,
    BurgerButtonComponent,
    MobileMenuDirective,
    FixedHeaderDirective,
    MapComponent,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SentenceCasePipe,
    SplitCamelCasePipe,
    HeaderComponent,
    MenuItemComponent,
    MobileMenuDirective,
    FixedHeaderDirective,
    MapComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MaterialModule],
})
export class SharedModule {}
