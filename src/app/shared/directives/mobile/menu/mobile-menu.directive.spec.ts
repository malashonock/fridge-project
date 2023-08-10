import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatSidenavHarness } from '@angular/material/sidenav/testing';

import { MobileMenuDirective } from './mobile-menu.directive';
import { SharedModule } from 'shared/shared.module';
import { UiActions } from 'app/state/ui/ui.actions';
import { uiFeature } from 'app/state/ui/ui.feature';
import { UiEffects } from 'app/state/ui/ui.effects';

@Component({
  template: `
    <mat-sidenav-container>
      <mat-sidenav appMobileMenu> Menu items go here </mat-sidenav>
      <mat-sidenav-content> Main content goes here </mat-sidenav-content>
    </mat-sidenav-container>
  `,
})
class HostComponent {}

describe('MobileMenuDirective', () => {
  let directive: MobileMenuDirective;
  let fixture: ComponentFixture<HostComponent>;
  let store: Store;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
          [uiFeature.name]: uiFeature.reducer,
        }),
        EffectsModule.forRoot([UiEffects]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    directive = fixture.debugElement
      .query(By.directive(MobileMenuDirective))
      .injector.get(MobileMenuDirective);
    store = TestBed.inject(Store);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should react to changes in mobile mode flag of UI store feature', async () => {
    const sideMenu = await loader.getHarness(MatSidenavHarness);

    store.dispatch(
      UiActions.toggleMobileMode({
        mobileMode: true,
      })
    );
    expect(await sideMenu.getMode()).toBe('over');

    store.dispatch(
      UiActions.toggleMobileMode({
        mobileMode: false,
      })
    );
    expect(await sideMenu.getMode()).toBe('side');
  });

  it('should react to changes in showSideMenu flag of UI store feature', async () => {
    const sideMenu = await loader.getHarness(MatSidenavHarness);

    store.dispatch(
      UiActions.toggleSideMenu({
        showSideMenu: true,
      })
    );
    expect(await sideMenu.isOpen()).toBe(true);

    store.dispatch(
      UiActions.toggleSideMenu({
        showSideMenu: false,
      })
    );
    expect(await sideMenu.isOpen()).toBe(false);
  });
});
