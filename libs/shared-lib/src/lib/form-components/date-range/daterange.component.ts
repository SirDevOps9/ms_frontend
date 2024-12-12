import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormGroup,
  FormBuilder,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import * as moment from 'moment-timezone';

@Component({
  selector: 'lib-date-range',
  templateUrl: './daterange.component.html',
  styleUrls: ['./daterange.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangeComponent),
      multi: true,
    },
  ],
})
export class DateRangeComponent implements AfterViewInit, ControlValueAccessor, Validator, OnInit {
  @Input() placeholder: string = 'Select a date range';
  @Input() dateFormat: string = 'yy-mm-dd';
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() readOnly: boolean = false;
  @Input() defaultDate: Date | null = null;
  @Output() valueChanged = new EventEmitter<Date[]>();

  currentYear = new Date().getFullYear();
  public formGroup!: FormGroup;

  private onTouched: () => void = () => {};
  private onChange: (value: any) => void = () => {};
  rangeDates: Date[] = [];
  buttonsVisible: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      rangeDates: this.fb.control([]), // Initialize rangeDates as FormControl
    });

    // Listen for form control value changes and emit to parent
    this.formGroup.get('rangeDates')?.valueChanges.subscribe((value) => {
      this.onChange(value);
      this.valueChanged.emit(value);
    });
  }

  writeValue(value: any): void {
    if (value) {
      const dates = Array.isArray(value) ? value.map((date) => new Date(date)) : [];
      this.formGroup.patchValue({ rangeDates: dates }, { emitEvent: false });
    } else {
      this.formGroup.patchValue({ rangeDates: [] }, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  validate(): ValidationErrors | null {
    const range = this.formGroup.get('rangeDates')?.value;
    if (this.minDate && range && range[0] < this.minDate) {
      return { minDateError: 'Start date is before the allowed minimum date' };
    }
    if (this.maxDate && range && range[1] > this.maxDate) {
      return { maxDateError: 'End date is after the allowed maximum date' };
    }
    return null;
  }

  ngAfterViewInit(): void {
    // Logic that requires DOM access after view initialization
  }

  selectCurrentMonth(): void {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    this.formGroup.patchValue({ rangeDates: [start, end] });
  }

  selectQuarter(quarter: number): void {
    const year = new Date().getFullYear();
    const quarters = [
      [new Date(year, 0, 1), new Date(year, 2, 31)], // Q1
      [new Date(year, 3, 1), new Date(year, 5, 30)], // Q2
      [new Date(year, 6, 1), new Date(year, 8, 30)], // Q3
      [new Date(year, 9, 1), new Date(year, 11, 31)], // Q4
    ];
    this.formGroup.patchValue({ rangeDates: quarters[quarter - 1] });
  }

  selectCurrentYear(): void {
    const year = new Date().getFullYear();
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);
    this.formGroup.patchValue({ rangeDates: [start, end] });
  }

  showButtons(): void {
    this.buttonsVisible = true;
  }

  hideButtons(): void {
    setTimeout(() => {
      this.buttonsVisible = false;
    }, 200);
  }
}
