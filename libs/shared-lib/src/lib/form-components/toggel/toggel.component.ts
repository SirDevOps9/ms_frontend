import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'lib-toggel',
  templateUrl: './toggel.component.html',
  styleUrl: './toggel.component.scss'
})
export class ToggelComponent implements ControlValueAccessor, Validator {

  onChange = (value: any) => { };
  onTouched = () => { };
  @Input() labelTest: any;

  writeValue(value: any): void {
    // alert("Write Value" + value);
    if (value) {
      this.isActive = value;
    }
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    throw new Error('Method not implemented.');
  }

  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

  registerOnChange(fn: any): void {
    console.log("Changed Value", fn);
    ("Changed Value")
    this.isActive = fn.target.value;
    alert(this.isActive);
  }

  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }

  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }
  @Input() isActive: boolean;

  @Output() valueChanged = new EventEmitter<boolean>();
  ngOnInit() {

  }
  changed(event: any) {
    console.log("Changed Ahmed", event);

    this.isActive = event.checked;
    this.valueChanged.emit(event.checked);
  }

  ngAfterViewInit() {
    if (this.controlDir) {
      setTimeout(() => {
        this.labelTest = this.controlDir.name;
      }, 500);
    }
  }


  constructor(@Self() @Optional() public controlDir: NgControl) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
  }
}
