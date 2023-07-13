import {
  Component,
  ElementRef,
  Injector,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';

type ChangeEventHandler = (value: string | null) => void;
type BlurEventHandler = () => void;

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    },
  ],
})
export class TextFieldComponent implements ControlValueAccessor, OnInit {
  @Input() name = '';
  @Input() label = '';
  @Input() error: string | null = null;

  formControl!: FormControl;

  @ViewChild('input', { static: true }) input!: ElementRef;

  value = '';

  onChange: ChangeEventHandler = () => undefined;
  onBlur: BlurEventHandler = () => undefined;

  constructor(private injector: Injector, private renderer: Renderer2) {}

  ngOnInit(): void {
    const ngControl = this.injector.get(NgControl);
    if (ngControl instanceof FormControlName) {
      this.formControl = this.injector
        .get(FormGroupDirective)
        .getControl(ngControl);
    } else {
      this.formControl = (ngControl as FormControlDirective)
        .form as FormControl;
    }
  }

  writeValue(value: string): void {
    this.renderer.setProperty(this.input.nativeElement, 'value', value);
  }

  registerOnChange(changeEventHandler: ChangeEventHandler): void {
    this.onChange = changeEventHandler;
  }

  registerOnTouched(blurEventHandler: BlurEventHandler): void {
    this.onBlur = blurEventHandler;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.input.nativeElement, 'disabled', isDisabled);
  }
}
