import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Optional,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

type ChangeEventHandler = (option: SelectOption | null) => void;
type BlurEventHandler = () => void;

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectFieldComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFieldComponent implements ControlValueAccessor {
  @Input() name = '';
  @Input() label = '';
  @Input() options: SelectOption[] = [];
  @Input() error: string | null = null;

  private _selectedOption: SelectOption | null = null;

  get selectedOption(): SelectOption | null {
    return this._selectedOption;
  }

  set selectedOption(option: SelectOption | null) {
    this._selectedOption = option;
    this.onChange(option);
  }

  onChange: ChangeEventHandler = () => undefined;
  onBlur: BlurEventHandler = () => undefined;

  constructor(@Optional() private formGroupDirective: FormGroupDirective) {}

  get formControl(): FormControl {
    return (
      (this.formGroupDirective?.control?.get(this.name) as FormControl) ??
      new FormControl(null)
    );
  }

  writeValue(option: SelectOption | null): void {
    this.selectedOption = option;
  }

  registerOnChange(changeEventHandler: ChangeEventHandler): void {
    this.onChange = changeEventHandler;
  }

  registerOnTouched(blurEventHandler: BlurEventHandler): void {
    this.onBlur = blurEventHandler;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }
}
