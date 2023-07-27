import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
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
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  public searchControl: FormControl;
  public products$: Observable<Product[]>;
  private searchQuery = '';
  private destroy$ = new Subject();

  @ViewChild('searchInput') searchInput!: ElementRef;

  public constructor(formBuilder: FormBuilder, private store: Store) {
    this.searchControl = formBuilder.control('');
    this.products$ = this.store.select(selectAllProducts);
  }

  public ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe((query: string): void => {
        this.searchQuery = query;
      });
  }

  public ngAfterViewInit(): void {
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

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
