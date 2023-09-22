import { CommonModule } from '@angular/common';
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
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  Observable,
  Subject,
  debounceTime,
  fromEvent,
  map,
  startWith,
  takeUntil,
} from 'rxjs';

const materialModules = [
  MatFormFieldModule,
  MatAutocompleteModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
];

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, materialModules],
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
    map((query: string | null): boolean => {
      return !query;
    }),
    takeUntil(this.destroy$)
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
