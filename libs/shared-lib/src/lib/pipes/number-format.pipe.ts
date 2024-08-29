import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat',
})
export class NumberFormatPipe implements PipeTransform {
  static fraction: string = '1.1-2';

  static formatNumber(value: number): string {
    // Parse the fraction digits from the static string
    const [minFractionDigits, maxFractionDigits] = this.fraction
      .split('-')
      .map((d) => parseInt(d, 10));

    // Format the number using Intl.NumberFormat
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minFractionDigits,
      maximumFractionDigits: maxFractionDigits,
    }).format(value);
  }

  transform(value: number | string): string {
    if (value == null || value === '') {
      return '0.0';
    }

    // Convert the value to a number if it's a string
    const numberValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numberValue)) {
      return '';
    }

    // Use the static method to format the number
    return NumberFormatPipe.formatNumber(numberValue);
  }
}
