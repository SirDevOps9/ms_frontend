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
  selector: 'lib-calendar',
  templateUrl: './calendar.component.html', 
  styleUrls: ['./calendar.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarComponent),
      multi: true,
    },
  ],
})
export class CalendarComponent implements AfterViewInit, ControlValueAccessor, Validator  , OnInit{
  // constructor(@Optional() @Self() public controlDir: NgControl) {
  //   if (this.controlDir) {
  //     this.controlDir.valueAccessor = this;
  //   }
  // }
  ngOnInit(): void {
    this.formGroup = new FormControl()

    this.formGroup.valueChanges.subscribe(console.log)

  }
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
  protected readonly fb = inject(FormBuilder);

  public formGroup!: FormGroup<any> | FormControl<any>;

  public onTouched: () => void = () => {};

  public writeValue(val: unknown): void {
    if (val) {
      // Format the date to "YYYY-MM-DD" and patch it to the form control
      const formattedDate = this.formatDate(val as string);
      this.formGroup.patchValue(new Date(formattedDate) , { emitEvent: true });
    }
  }

  private formatDate(date: string): string {
    return moment(date).format('YYYY-MM-DD');
  }
  


  public registerOnChange(fn: (val: string) => void): void {
    this.formGroup.valueChanges?.subscribe((val) => {
      // Emit the formatted date as "YYYY-MM-DD" when value changes
      fn( this.formatDate(val));
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
}
