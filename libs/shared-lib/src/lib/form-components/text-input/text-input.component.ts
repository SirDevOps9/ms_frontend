import {
  Component,
  Input,
  Output,
  EventEmitter,
  Optional,
  Self,
  input,
  AfterViewInit,
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
export class TextInputComponent implements ControlValueAccessor, Validator, AfterViewInit {
  @Input() label: string;
  @Input() labelTest: any  = "input-text";
  @Input() type: 'text' | 'number' | 'tel' | 'email' | 'date' | 'radio'|'checkbox' | 'file';
  @Input() readOnly: boolean;
  @Input() textbox: boolean;
  @Input() inputContainerClass: string;
  @Input() placeholder: string = '';
  @Input() maxLength: string;
  // @Input() data_testid: any = this.labelTest;
  @Input() id: string;
  @Input() iconUrl: string = '';
  @Output() valueChanged = new EventEmitter<string>();

  @Output() keyUp = new EventEmitter<string>();
  @Output() keyUpFullEvent = new EventEmitter<string>();

  value: string = '';
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      this.value = value;
    } else {
      this.value = '';  // Reset the input to an empty string if null is passed
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
    this.keyUpFullEvent.emit(m);
  }

  filterInput(event: KeyboardEvent): boolean {
    const key = event.key;
    const isNotWanted = key === 'e' || key === 'E'; // 'E' and 'e'
    return !isNotWanted;
  }

  handlePaste(event: ClipboardEvent): void {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedData = clipboardData.getData('Text').toUpperCase();

    if (pastedData.includes('E')) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  constructor(@Self() @Optional() public controlDir: NgControl) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
      this.labelTest = this.controlDir.name;

    }
  }
  ngAfterViewInit() {
    if (this.controlDir) {
      setTimeout(() => {
        this.labelTest = this.controlDir.name;
      }, 500);
    }
  }
}
