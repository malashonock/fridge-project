import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, debounceTime, fromEvent, takeUntil } from 'rxjs';

import { Product } from 'core/models';
import { selectAllProducts } from 'app/state/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements AfterViewInit, OnDestroy {
  public searchControl: FormControl;
  private destroy$ = new Subject();

  @ViewChild('searchInput') private searchInput!: ElementRef;

  public constructor(formBuilder: FormBuilder, private store: Store) {
    this.searchControl = formBuilder.control('');
  }

  public ngAfterViewInit(): void {
    this.subscribeToSearchKeyboardEvents();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private subscribeToSearchKeyboardEvents(): void {
    fromEvent<KeyboardEvent>(this.searchInput.nativeElement, 'keyup')
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: KeyboardEvent) => {
        switch (event.code) {
          case 'Escape':
            this.searchControl.reset();
            break;
          default:
            break;
        }
      });
  }

  public get products$(): Observable<Product[]> {
    return this.store.select(selectAllProducts);
  }

  public get searchQuery$(): Observable<string> {
    return this.searchControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(500)
    );
  }
}
