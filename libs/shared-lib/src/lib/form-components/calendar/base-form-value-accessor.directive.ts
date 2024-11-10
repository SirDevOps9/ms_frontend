import { Directive, inject } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import moment from 'moment-timezone';


@Directive({
  selector: '[appFormValueAccessor]',
  standalone: true,
})
export class BaseValueAccessorComponent
  implements ControlValueAccessor, Validator
{
  protected readonly fb = inject(FormBuilder);

  public formGroup!: FormGroup<any> | FormControl<any>;

  public onTouched: () => void = () => {};

  public writeValue(val: unknown): void {
  console.log(val);
  
    val && this.formGroup.patchValue(this.dateTimeZone(val as string), { emitEvent: true });


  }

  public registerOnChange(fn: () => void): void {
    this.formGroup.valueChanges?.subscribe(fn);
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

  dateTimeZone (date: string, format?: string): Date | null | string  {
    const timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get the time zone ID

    const utcDate = moment.utc(date);

    return date ? new Date(utcDate.tz(timeZone).format(format)) : null;
  }
}
