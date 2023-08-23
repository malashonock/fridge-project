import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import {
  Observable,
  Subject,
  debounceTime,
  fromEvent,
  map,
  startWith,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent implements AfterViewInit, OnDestroy {
  @Input() public name = 'search-box';
  @Input() public label = $localize`:@@search:Search`;
  @Input() public placeholder = '';
  @Input() public autocomplete?: MatAutocomplete;

  public searchControl = this.formBuilder.control('');

  private destroy$ = new Subject();

  public isBlank$ = this.searchControl.valueChanges.pipe(
    startWith(this.searchControl.value),
    takeUntil(this.destroy$),
    map((query: string | null): boolean => {
      return !query;
    })
  );

  @Output() public get searchQueryChange(): Observable<string> {
    return this.searchControl.valueChanges.pipe(
      debounceTime(500),
      startWith(this.searchControl.value),
      map((query: string | null): string => {
        return query ?? '';
      })
    );
  }

  @ViewChild('searchInput') private searchInput!: ElementRef;

  public constructor(private formBuilder: FormBuilder) {}

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

  public reset(): void {
    this.searchControl.reset('');
  }
}
