import { ChangeDetectorRef, Directive, OnDestroy, OnInit } from '@angular/core';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { UiActions } from 'app/state/ui/ui.actions';

@Directive({
  selector: '[appMobilePage]',
  standalone: true,
})
export class MobilePageDirective implements OnInit, OnDestroy {
  destroy$ = new Subject();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    private viewRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.TabletPortrait,
        Breakpoints.HandsetPortrait,
      ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.handleBreakpointChange.bind(this));
  }

  handleBreakpointChange(state: BreakpointState): void {
    this.store.dispatch(
      UiActions.toggleMobileMode({ mobileMode: state.matches })
    );
    // Need to trigger CD manually to avoid ExpressionChangedAfterItHasBeenCheckedError
    this.viewRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
