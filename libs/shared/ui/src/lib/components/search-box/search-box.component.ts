import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  Output,
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
  selector: 'lib-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, materialModules],
})
export class SearchBoxComponent implements OnDestroy {
  @Input() public name = 'search-box';
  @Input() public label = $localize`:@@search:Search`;
  @Input() public placeholder = '';
  @Input() public autocomplete?: MatAutocomplete;

  public searchControl = this.formBuilder.nonNullable.control('');

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

  public constructor(private formBuilder: FormBuilder) {}

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
