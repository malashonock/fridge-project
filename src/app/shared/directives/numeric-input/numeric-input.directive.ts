import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  NgZone,
  Optional,
  Renderer2,
  Self,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NgControl,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  MAT_FORM_FIELD,
  MatFormField,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { MAT_INPUT_VALUE_ACCESSOR, MatInput } from '@angular/material/input';

type VoidEventHandler = () => void;
type ChangeEventHandler = (value: number | string | null) => void;

@Directive({
  selector: 'input[type="text"][appNumericInput]',
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => NumericInputDirective),
    },
  ],
})
export class NumericInputDirective
  extends MatInput
  implements ControlValueAccessor
{
  private formControl = new FormControl(null as number | string | null);

  private notifyChangeListener: ChangeEventHandler | null = null;
  private notifyTouchedListener: VoidEventHandler | null = null;

  @HostListener('input', ['$event.target.value']) private onChange(
    text: string
  ): void {
    const textAsNumber = Number(text);
    this.notifyChangeListener?.(
      Number.isNaN(textAsNumber) ? text : text === '' ? null : textAsNumber
    );
  }

  @HostListener('blur') private onBlur(): void {
    this.notifyTouchedListener?.();
  }

  public constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    platform: Platform,
    @Optional() @Self() ngControl: NgControl,
    @Optional() parentForm: NgForm,
    @Optional() parentFormGroup: FormGroupDirective,
    defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional()
    @Self()
    @Inject(MAT_INPUT_VALUE_ACCESSOR)
    matInputValueAccessor: ControlValueAccessor,
    autoFillMonitor: AutofillMonitor,
    ngZone: NgZone,
    @Optional() @Inject(MAT_FORM_FIELD) matFormField: MatFormField
  ) {
    super(
      elementRef,
      platform,
      ngControl,
      parentForm,
      parentFormGroup,
      defaultErrorStateMatcher,
      matInputValueAccessor,
      autoFillMonitor,
      ngZone,
      matFormField
    );

    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  public writeValue(value: number | string | null): void {
    this.renderer.setProperty(
      this.elementRef,
      'value',
      value?.toString() ?? ''
    );
  }

  public registerOnChange(onChangeCallback: ChangeEventHandler): void {
    this.notifyChangeListener = onChangeCallback;
  }

  public registerOnTouched(onTouchedCallback: VoidEventHandler): void {
    this.notifyTouchedListener = onTouchedCallback;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'disabled',
      isDisabled
    );
  }
}
