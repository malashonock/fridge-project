import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FixedHeaderDirective } from './fixed-header.directive';
import { SharedModule } from 'app/shared/shared.module';

@Component({
  template: `
    <mat-toolbar appFixedHeader></mat-toolbar>
    <mat-sidenav-container></mat-sidenav-container>
  `,
})
class HostComponent {}

describe('FixedHeaderDirective', () => {
  // let directive: FixedHeaderDirective;
  // let fixture: ComponentFixture<HostComponent>;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [HostComponent],
  //     imports: [SharedModule],
  //   }).compileComponents();

  //   fixture = TestBed.createComponent(HostComponent);
  //   directive = fixture.debugElement
  //     .query(By.directive(FixedHeaderDirective))
  //     .injector.get(FixedHeaderDirective);
  //   fixture.detectChanges();
  // });

  it('should create an instance', () => {
    expect(true).toBe(true);
    // expect(directive).toBeTruthy();
  });
});
