import {
  Component,
  Input,
  Output,
  EventEmitter,
  Optional,
  Self,
  input,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'lib-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class  TextInputComponent implements ControlValueAccessor, Validator {
  @Input() label: string;
  @Input() type: 'text' | 'number' | 'tel' | 'email' | 'date' | 'radio';
  @Input() readOnly: boolean;
  @Input() inputContainerClass: string;
  @Input() placeholder: string = '';
  @Input() maxLength: string;
  @Input() id: string;
  @Input() iconUrl: string = '';
  @Output() valueChanged = new EventEmitter<string>();

  @Output() keyUp = new EventEmitter<string>();

  value: string = '';
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
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

  onInput(value: string) {
    this.value = value;
    this.valueChanged.emit(this.value);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    return null;
  }

  change(m: any) {
    this.onChange(m.target.value);
    this.valueChanged.emit(m.target.value);
  }

  keyupChange(m: any) {
    this.onChange(m.target.value);

    this.keyUp.emit(m.target.value);
  }

  constructor(@Self() @Optional() public controlDir: NgControl) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
  }
}
