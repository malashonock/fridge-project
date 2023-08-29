import {
  Directive,
  ElementRef,
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
  selector: '[appFixedHeader]',
})
export class FixedHeaderDirective implements OnInit, OnDestroy {
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
    // Make header fixed
    this.setHeaderStyles();

    // Subscribe to header height observable
    this.headerHeight$
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
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

  private setHeaderStyles(): void {
    this.setHeaderStyle('position', 'fixed');
    this.setHeaderStyle('top', '0');
    this.setHeaderStyle('width', '100%');
    this.setHeaderStyle('z-index', '10');
  }

  private setContentStyles(headerHeight: number): void {
    this.setContentStyle('position', 'fixed');
    this.setContentStyle('top', `${headerHeight}px`);
    this.setContentStyle('width', '100%');
    this.setContentStyle('bottom', '0');
  }

  private setElementStyle(
    element: HTMLElement,
    cssProperty: string,
    value: string
  ): void {
    this.renderer.setStyle(element, cssProperty, value);
  }

  private setHeaderStyle(cssProperty: string, value: string): void {
    this.setElementStyle(this.elementRef.nativeElement, cssProperty, value);
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
}
