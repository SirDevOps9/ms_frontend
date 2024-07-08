import { Component, EventEmitter, forwardRef, Input, Output, Optional, Self } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl } from "@angular/forms";

@Component({
  selector: 'lib-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],

})
export class CalendarComponent implements ControlValueAccessor {
  @Input() placeholder: string;
  @Input() dateFormat: string = 'dd/mm/yy';
  @Input() minDate: Date | null;
  @Input() maxDate: Date | null;
  @Input() label: string;
  @Input() disabled: boolean = false;
  @Output() valueChanged = new EventEmitter<Date | string>();

  value: Date;
  onChange = (value: any) => {};
  onTouched = () => {};

  constructor(@Self() @Optional() public controlDir: NgControl) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
  }

  writeValue(value: Date): void {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implement if your component supports disabling
  }

  convertDateFormat(data : Date) {
    const date = new Date(data);
  
    // Extract the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
    const day = String(date.getDate()).padStart(2, '0');
    
    // Format the date into YYYY-MM-DD
    return `${year}-${month}-${day}`;
  }

  handleDateChange(event: any): void {
    this.value =  event;
    this.onChange(this.convertDateFormat(event));
    this.onTouched();
    this.valueChanged.emit(this.convertDateFormat(event));
  }
}
