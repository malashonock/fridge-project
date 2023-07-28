import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FixedHeaderDirective } from './fixed-header.directive';
import { SharedModule } from 'shared/shared.module';
import { ResizeObserverSpies } from 'rootDir/setup-jest';

@Component({
  template: `
    <mat-toolbar appFixedHeader></mat-toolbar>
    <mat-sidenav-container></mat-sidenav-container>
  `,
})
class HostComponent {}

describe('FixedHeaderDirective', () => {
  let directive: FixedHeaderDirective;
  let fixture: ComponentFixture<HostComponent>;
  let headerEl: ElementRef;
  let contentEl: ElementRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    directive = fixture.debugElement
      .query(By.directive(FixedHeaderDirective))
      .injector.get(FixedHeaderDirective);
    headerEl = fixture.debugElement
      .query(By.css('mat-toolbar'))
      .injector.get(ElementRef);
    contentEl = fixture.debugElement
      .query(By.css('mat-sidenav-container'))
      .injector.get(ElementRef);

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(true).toBe(true);
    expect(directive).toBeTruthy();
  });

  it('should apply appropriate styles to header', () => {
    expect(headerEl.nativeElement.style.position).toBe('fixed');
    expect(headerEl.nativeElement.style.top).toBe('0px');
    expect(headerEl.nativeElement.style.width).toBe('100%');
    expect(headerEl.nativeElement.style.zIndex).toBe('10');
  });

  it('should apply appropriate fixed styles to content container', () => {
    expect(contentEl.nativeElement.style.position).toBe('fixed');
    expect(contentEl.nativeElement.style.width).toBe('100%');
    expect(contentEl.nativeElement.style.bottom).toBe('0px');
  });

  it('should adjust top margin of the content container to match header height changes', () => {
    const { spyOnResizeObserverObserve, triggerResizeObserver } =
      ResizeObserverSpies;
    expect(spyOnResizeObserverObserve).toHaveBeenCalledWith(
      headerEl.nativeElement
    );
    expect(triggerResizeObserver).toBeTruthy();

    // Set header height to 50px
    triggerResizeObserver.fn([
      {
        borderBoxSize: [
          {
            blockSize: 50,
            inlineSize: 1920,
          },
        ],
        contentBoxSize: [],
        devicePixelContentBoxSize: [],
        contentRect: {
          height: 50,
          width: 1920,
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          x: 0,
          y: 0,
          toJSON: jest.fn(),
        },
        target: headerEl.nativeElement,
      },
    ]);

    expect(contentEl.nativeElement.style.top).toBe('50px');
  });
});
