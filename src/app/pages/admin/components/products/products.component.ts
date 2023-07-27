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
import { Subject, debounceTime, fromEvent, takeUntil } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject();
  public searchControl: FormControl;

  @ViewChild('searchInput') searchInput!: ElementRef;

  public constructor(formBuilder: FormBuilder, private store: Store) {
    this.searchControl = formBuilder.control('');
  }

  public ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe((query: string): void => {
        console.log('dispatch set query action:', query);
        // this.store.dispatch(ProductActions.searchProducts);
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
