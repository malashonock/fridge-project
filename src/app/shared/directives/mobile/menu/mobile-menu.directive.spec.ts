import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MobileMenuDirective } from './mobile-menu.directive';
import * as uiFeature from 'app/state/ui/ui.feature';
import { SharedModule } from 'app/shared/shared.module';
import { By } from '@angular/platform-browser';

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [SharedModule, BrowserAnimationsModule],
      providers: [
        provideMockStore({
          initialState: {
            ui: uiFeature.initialState,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    directive = fixture.debugElement
      .query(By.directive(MobileMenuDirective))
      .injector.get(MobileMenuDirective);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
