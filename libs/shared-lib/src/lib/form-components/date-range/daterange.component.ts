import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  Optional,
  Self,
  AfterViewInit,
  inject,
  OnInit,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NgControl,
  FormControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validator,
} from '@angular/forms';

import moment from 'moment-timezone';
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
  currentYear = new Date().getFullYear();
  // constructor(@Optional() @Self() public controlDir: NgControl) {
  //   if (this.controlDir) {
  //     this.controlDir.valueAccessor = this;
  //   }
  // }
  ngOnInit(): void {
    this.formGroup = new FormControl();
  }
  @Input() placeholder: string;
  @Input() dateFormat: string = 'dd/mm/yy';
  @Input() minDate: Date | null;
  @Input() maxDate: Date | null;
  @Input() label: string;
  @Input() disabled: boolean = false;
  @Input() readOnly: boolean;
  @Input() labelTest: any = 'calendar';
  @Output() valueChanged = new EventEmitter<Date[]>();
  @Input() defaultDate: Date | null;
  value: any;
  protected readonly fb = inject(FormBuilder);

  public formGroup!: FormGroup<any> | FormControl<any>;

  public onTouched: () => void = () => {};

  public writeValue(val: unknown): void {
    if (val) {
      const dates = Array.isArray(val) ? val.map((date) => new Date(date)) : [];
      this.formGroup.patchValue(dates, { emitEvent: true });
    } else {
      this.formGroup.patchValue([], { emitEvent: true });
    }
  }

  private formatDate(date: string): string {
    return moment(date).format('YYYY-MM-DD');
  }

  public registerOnChange(fn: (val: string) => void): void {
    this.formGroup.valueChanges?.subscribe((val) => {
      // Emit the formatted date as "YYYY-MM-DD" when value changes
      fn(this.formatDate(val));
    });
  }
  public get disableInputs(): boolean {
    return !this.formGroup.get('enabled')?.value;
  }

  public registerOnTouched = (fn: Function): void => {
    this.formGroup.valueChanges.subscribe((val) => fn(val));
  };

  private _resetForm = (): void => this.formGroup.reset();

  public validate(): ValidationErrors | null {
    return this.formGroup.valid
      ? null
      : {
          invalidForm: {
            valid: false,
            message: 'Form fields are invalid',
          },
        };
  }

  dateTimeZone(date: string, format?: string): Date | null | string {
    const timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get the time zone ID

    const utcDate = moment.utc(date);

    return date ? new Date(utcDate.tz(timeZone).format(format)) : null;
  }

  ngAfterViewInit() {
    // if (this.controlDir) {
    //   setTimeout(() => {
    //     this.labelTest = this.controlDir.name;
    //   }, 500);
    // }
  }

  rangeDates: Date[] = [];

  selectCurrentMonth() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    this.rangeDates = [start, end];
    this.valueChanged.emit(this.rangeDates);
  }

  selectQuarter(quarter: number) {
    const year = new Date().getFullYear();
    const quarters = [
      [new Date(year, 0, 1), new Date(year, 2, 31)], // Q1
      [new Date(year, 3, 1), new Date(year, 5, 30)], // Q2
      [new Date(year, 6, 1), new Date(year, 8, 30)], // Q3
      [new Date(year, 9, 1), new Date(year, 11, 31)], // Q4
    ];
    this.rangeDates = quarters[quarter - 1];
    this.valueChanged.emit(this.rangeDates);
  }

  selectCurrentYear() {
    const year = new Date().getFullYear();
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);
    this.rangeDates = [start, end];
    this.valueChanged.emit(this.rangeDates);
  }

  buttonsVisible: boolean = false;

  showButtons() {
    this.buttonsVisible = true;
  }

  hideButtons() {
    setTimeout(() => {
      this.buttonsVisible = false;
    }, 200);
  }

  selectDate() {
    this.valueChanged.emit(this.rangeDates);
  }
}
