import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { NumberFormatPipe } from '../pipes/number-format.pipe';

@Directive({
  selector: '[appNumberFormat]'
})
export class NumberFormatDirective {
  private previousValue: string = '';

  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    // Remove any non-numeric characters except the decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');

    // If the value is empty, reset it
    if (numericValue === '') {
      this.previousValue = '';
      this.control.control?.setValue('');
      return;
    }

    // Convert the numeric string to a number
    const numberValue = parseFloat(numericValue);

    // If the value is not a number, keep the previous valid value
    if (isNaN(numberValue)) {
      this.control.control?.setValue(this.previousValue);
      return;
    }

    // Format the number using the pipe's static method
    const formattedValue = NumberFormatPipe.formatNumber(numberValue);

    // Update the control and keep track of the previous value
    this.previousValue = formattedValue;
    this.control.control?.setValue(formattedValue);

    // Adjust the input field value directly
    this.el.nativeElement.value = formattedValue;

    // Ensure the element supports setSelectionRange
    const nativeElement = this.el.nativeElement;
    if (nativeElement instanceof HTMLInputElement || nativeElement instanceof HTMLTextAreaElement) {
      // Move the cursor to the end
      nativeElement.setSelectionRange(formattedValue.length, formattedValue.length);
    }
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string): void {
    // Ensure the value is properly formatted on blur
    const numericValue = value.replace(/[^0-9.]/g, '');
    const numberValue = parseFloat(numericValue);

    if (!isNaN(numberValue)) {
      const formattedValue = NumberFormatPipe.formatNumber(numberValue);
      this.el.nativeElement.value = formattedValue;
    }
  }
}