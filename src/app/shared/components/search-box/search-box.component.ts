import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import {
  Observable,
  Subject,
  debounceTime,
  fromEvent,
  map,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements AfterViewInit, OnDestroy {
  @Input() public name = 'search-box';
  @Input() public placeholder = '';

  public searchControl: FormControl;

  private destroy$ = new Subject();

  @Output() get searchQueryChange(): Observable<string> {
    return this.searchControl.valueChanges.pipe(
      debounceTime(500),
      map((rawQuery: string) => {
        return rawQuery?.trim().toLowerCase();
      })
    );
  }

  @ViewChild('searchInput') private searchInput!: ElementRef;

  public constructor(formBuilder: FormBuilder) {
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
}
