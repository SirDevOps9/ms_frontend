import { Component, EventEmitter, forwardRef, Input, Output, Optional, Self } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl } from '@angular/forms';

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
  @Input() readOnly: boolean;
  @Input() labelTest: any = 'calendar';
  @Output() valueChanged = new EventEmitter<Date>();
  @Input() defaultDate: Date | null;
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
      this.value = this.convert_to_local_date(value);
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

  handleDateChange(event: any): void {
    const parsedDate = new Date(event);
    const localDate = this.convert_to_local_date(parsedDate);
    this.value = localDate;
    this.onChange(this.value);
    this.onTouched();
    this.valueChanged.emit(localDate);
  }

  ngAfterViewInit() {
    if (this.controlDir) {
      setTimeout(() => {
        this.labelTest = this.controlDir.name;
      }, 500);
    }
  }

  convert_to_local_date(date: Date) {
    // debugger;
    const currentDate = new Date(date);
    currentDate.setMinutes(currentDate.getMinutes() - currentDate.getTimezoneOffset());

    return currentDate;
  }
}
