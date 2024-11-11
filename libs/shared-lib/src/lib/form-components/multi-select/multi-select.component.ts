import {
  Component,
  EventEmitter,
  Input,
  Optional,
  Output,
  Self,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'lib-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MultiSelectComponent implements ControlValueAccessor, Validator {
  @Input() label: string;
  @Input() options: any[];
  @Input() optionValue = 'id';
  @Input() optionLabel = 'name';
  @Input() readOnly: boolean;
  @Input() disabled: boolean;
  @Input() inputContainerClass: string;
  @Input() placeholder: string = ' Select';
  @Input() maxLength: string;
  @Input() id: string;
  @Input() className: string;
  @Input() selectedValue: any;
  @Input() data_testid: string = '';
  @Input() labelTest: any;

  @Output() valueChanged = new EventEmitter<string | []>();

  value: string | null = '';
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }
    //  else {
    //   this.value = null;
    // }
  }

  onOptionRemoved(removedOption: any) {
    this.selectedValue = [];
    this.value = null;
    this.valueChanged.emit([]);
    this.onChange(this.value);
    this.onTouched();
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

  change(event: any) {
    // console.log(event.value);
    this.onChange(event.value);
    this.valueChanged.emit(event.value);
  }

  constructor(@Self() @Optional() public controlDir: NgControl) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
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
