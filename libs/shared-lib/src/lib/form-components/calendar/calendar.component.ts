import { Component, EventEmitter, forwardRef, Input, Output, Optional, Self, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl, FormControl } from '@angular/forms';
import moment from 'moment-timezone';
import { BaseValueAccessorComponent } from './base-form-value-accessor.directive';
@Component({
  selector: 'lib-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarComponent),
      multi: true,
    },
  ]
})
export class CalendarComponent extends BaseValueAccessorComponent implements AfterViewInit {
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
  value: any;


  ngOnInit(): void {
    this.formGroup = new FormControl(this.dateTimeZone(new Date().toString()))
    this.formGroup.valueChanges.subscribe(res=>{
      console.log(res)
      this.valueChanged.emit(res);
      this.value = this.convert_to_local_date(res)

    })

  }

  


  // onChange = (value: any) => {};
  // onTouched = () => {};

  // constructor(@Self() @Optional() public controlDir: NgControl) {
  //   if (this.controlDir) {
  //     this.controlDir.valueAccessor = this;
  //   }
  // }

  // Method to update the value and propagate the changes
  // handleDateChange(event: any): void {
  //   if (event) {
  //     const parsedDate = new Date(event);
  //     // If the date is invalid, return early
  //     if (isNaN(parsedDate.getTime())) {
  //       return;
  //     }

  //     // Convert to local time
  //     const localDate = this.convert_to_local_date(parsedDate.toString());

  //     event.value = localDate
  //     // Update the value
  //     //  this.value = localDate;

  //     // Notify changes
  //     this.onChange(this.value);
  //     this.onTouched();
  //     this.valueChanged.emit(new Date(localDate));
  //   }
  // }

  // Convert a given date to local time by adjusting for the timezone offset
convert_to_local_date(date: Date | string): Date {
  // If the date is a string, attempt to parse it into a Date object
  if (typeof date === 'string') {
    date = new Date(date); // Try to create a Date object from the string
  }

  // Check if the date is a valid Date object
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.error('Invalid date passed to convert_to_local_date:', date);
    return new Date(); // Return current date as a fallback, or null if that's preferred
  }

  // Convert the date to local timezone
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate;
}
  // ControlValueAccessor interface methods
  // writeValue(value: Date): void {
  //   if (value) {
  //     this.value = new Date(this.dateTimeZone(value.toString()) as string);
  //   } else {
  //     this.value = null;
  //   }
  // }

  // registerOnChange(fn: any): void {
  //   this.onChange = fn;
  // }

  // registerOnTouched(fn: any): void {
  //   this.onTouched = fn;
  // }

  // setDisabledState?(isDisabled: boolean): void {
  //   this.disabled = isDisabled;
  // }
  

  ngAfterViewInit() {
    // if (this.controlDir) {
    //   setTimeout(() => {
    //     this.labelTest = this.controlDir.name;
    //   }, 500);
    // }
  }
  // dateTimeZone (date: string, format?: string): Date | null | string  {
  //   const timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get the time zone ID

  //   const utcDate = moment.utc(date);

  //   console.log(utcDate)

  //   return date ? new Date(utcDate.tz(timeZone).format(format)) : null;
  // }
}
