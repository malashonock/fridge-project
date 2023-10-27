import {
  Directive,
  ElementRef,
  HostBinding,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs';

@Directive({
  selector: '[libFixedHeader]',
})
export class FixedHeaderDirective implements OnInit, OnDestroy {
  // Make header fixed
  @HostBinding('style.position') private headerPosition = 'fixed';
  @HostBinding('style.top.px') private headerTop = 0;
  @HostBinding('style.width.%') private headerWidth = 100;
  @HostBinding('style.z-index') private headerZIndex = 10;

  private headerHeight$ = new BehaviorSubject(
    this.elementRef.nativeElement.getBoundingClientRect().height
  );

  private headerHeightObserver = new ResizeObserver(
    (entries: ResizeObserverEntry[]) => {
      // Angular zone hasn't monkey patched ResizeObserver yet,
      // so we gotta force the callback to run in Angular zone
      this.zone.run(() => {
        const headerHeight = entries[0].borderBoxSize[0].blockSize;
        this.headerHeight$.next(headerHeight);
      });
    }
  );

  private destroy$ = new Subject();

  public constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private zone: NgZone
  ) {}

  public ngOnInit(): void {
    // Subscribe to header height observable
    this.headerHeight$
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((headerHeight: number) => {
        this.setContentStyles(headerHeight);
      });

    // Subscribe header height observer
    this.headerHeightObserver.observe(this.elementRef.nativeElement);
  }

  public ngOnDestroy(): void {
    this.headerHeightObserver.unobserve(this.elementRef.nativeElement);
    this.headerHeight$.complete();
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private setContentStyles(headerHeight: number): void {
    this.setContentStyle('position', 'fixed');
    this.setContentStyle('top', `${headerHeight}px`);
    this.setContentStyle('width', '100%');
    this.setContentStyle('bottom', '0');
  }

  private setContentStyle(cssProperty: string, value: string): void {
    const headerFirstSibling = (this.elementRef.nativeElement as HTMLElement)
      .nextElementSibling;

    if (headerFirstSibling) {
      this.setElementStyle(
        headerFirstSibling as HTMLElement,
        cssProperty,
        value
      );
    }
  }

  private setElementStyle(
    element: HTMLElement,
    cssProperty: string,
    value: string
  ): void {
    this.renderer.setStyle(element, cssProperty, value);
  }
}
