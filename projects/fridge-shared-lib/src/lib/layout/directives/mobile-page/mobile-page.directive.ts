import { ChangeDetectorRef, Directive, OnDestroy, OnInit } from '@angular/core';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { UiActions } from '@shared/store/ui/ui.actions';

@Directive({
  selector: '[appMobilePage]',
  standalone: true,
})
export class MobilePageDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  public constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    private viewRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.TabletPortrait,
        Breakpoints.HandsetPortrait,
      ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.handleBreakpointChange.bind(this));
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private handleBreakpointChange(state: BreakpointState): void {
    this.store.dispatch(
      UiActions.toggleMobileMode({ mobileMode: state.matches })
    );
    // Need to trigger CD manually to avoid ExpressionChangedAfterItHasBeenCheckedError
    this.viewRef.detectChanges();
  }
}
