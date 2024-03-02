import { Directive, ElementRef, Host, HostListener, Provider, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const DATE_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateValueAccessorDirective),
  multi: true,
};

@Directive({
  selector:
    'input([type=date][formControlName], [type=date][formControl], [type=date][ngModel])',
  providers: [DATE_VALUE_ACCESSOR],
  standalone: true,
})
export class DateValueAccessorDirective implements ControlValueAccessor {
  constructor(private element: ElementRef) {}

  @HostListener('input', ['$event.target.valueAsDate'])
  private onChange! : Function
  
  @HostListener('blur')
  private onTouched! : Function;

  registerOnChange(fn: Function): void {
    this.onChange = (valueAsDate: Date) => { fn(valueAsDate); };
  }
  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }
  
  writeValue(newValue: any): void {
    if (newValue instanceof Date) {
      this.element.nativeElement.value = newValue.toISOString().split('T')[0];
    }
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}
