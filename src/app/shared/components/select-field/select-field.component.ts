import { Component, Input, Optional, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

type ChangeEventHandler = (value: SelectOption | null) => void;
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
})
export class SelectFieldComponent implements ControlValueAccessor {
  @Input() name = '';
  @Input() label = '';
  @Input() options: SelectOption[] = [];
  @Input() error: string | null = null;

  private _value: SelectOption | null = null;

  get value(): SelectOption | null {
    return this._value;
  }

  set value(option: SelectOption | null) {
    this._value = option;
    this.onChange(option);
  }

  disabled = false;

  onChange: ChangeEventHandler = () => undefined;
  onBlur: BlurEventHandler = () => undefined;

  constructor(@Optional() private formGroupDirective: FormGroupDirective) {}

  get formControl(): FormControl {
    return (
      (this.formGroupDirective?.control?.get(this.name) as FormControl) ??
      new FormControl(null)
    );
  }

  writeValue(value: SelectOption | null): void {
    this.value = value;
  }

  registerOnChange(changeEventHandler: ChangeEventHandler): void {
    this.onChange = changeEventHandler;
  }

  registerOnTouched(blurEventHandler: BlurEventHandler): void {
    this.onBlur = blurEventHandler;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
