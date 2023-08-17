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

  public searchControl = this.formBuilder.control('');

  private destroy$ = new Subject();

  @Output() public get searchQueryChange(): Observable<string> {
    return this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),
      debounceTime(500),
      map((rawQuery: string | null) => {
        return rawQuery?.trim().toLowerCase() || '';
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
}
