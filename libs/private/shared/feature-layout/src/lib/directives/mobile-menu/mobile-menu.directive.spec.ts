import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatSidenavHarness } from '@angular/material/sidenav/testing';
import { Subject } from 'rxjs';
import '@angular/localize/init';

import { UiFacade } from 'private-shared-data-access';
import { MaterialModule } from 'shared-ui';

import { MobileMenuDirective } from './mobile-menu.directive';

@Component({
  template: `
    <mat-sidenav-container>
      <mat-sidenav libMobileMenu> Menu items go here </mat-sidenav>
      <mat-sidenav-content> Main content goes here </mat-sidenav-content>
    </mat-sidenav-container>
  `,
})
class HostComponent {}

describe('MobileMenuDirective', () => {
  let directive: MobileMenuDirective;
  let fixture: ComponentFixture<HostComponent>;
  let loader: HarnessLoader;
  const testMobileMode = new Subject();
  const testShowSideMenu = new Subject();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, MobileMenuDirective],
      imports: [MaterialModule, BrowserAnimationsModule],
      providers: [
        {
          provide: UiFacade,
          useValue: {
            getMobileMode$: () => testMobileMode.asObservable(),
            getShowSideMenu$: () => testShowSideMenu.asObservable(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    directive = fixture.debugElement
      .query(By.directive(MobileMenuDirective))
      .injector.get(MobileMenuDirective);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should react to changes in mobile mode flag of UI store feature', async () => {
    const sideMenu = await loader.getHarness(MatSidenavHarness);

    testMobileMode.next(true);
    expect(await sideMenu.getMode()).toBe('over');

    testMobileMode.next(false);
    expect(await sideMenu.getMode()).toBe('side');
  });

  it('should react to changes in showSideMenu flag of UI store feature', async () => {
    const sideMenu = await loader.getHarness(MatSidenavHarness);

    testShowSideMenu.next(true);
    expect(await sideMenu.isOpen()).toBe(true);

    testShowSideMenu.next(false);
    expect(await sideMenu.isOpen()).toBe(false);
  });
});
