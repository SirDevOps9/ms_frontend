import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: number | string, ...args: any[]): string {
    if (value == null) {
      return '';
    }

    // Convert the value to a number if it's a string
    const numberValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numberValue)) {
      return '';
    }

    // Use a regular expression to format the number with thousands separators
    return numberValue.toLocaleString();
  }
}