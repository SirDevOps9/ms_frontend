import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalSeparator',
})
export class DecimalSeperatorPipe implements PipeTransform {
  transform(value: string | number): string {
    if (typeof value !== 'number' && typeof value !== 'string') return `${value}`;
    value = Math.floor(+value);
    const stringValue = value.toString();
    const isNegative = stringValue.startsWith('-');
    const absoluteValue = isNegative ? stringValue.substring(1) : stringValue;

    const formattedValue = absoluteValue
      .split('')
      .reverse()
      .reduce((acc, char, index) => {
        return index > 0 && index % 3 === 0 ? `${char},${acc}` : `${char}${acc}`;
      }, '');

    return isNegative ? `-${formattedValue}` : formattedValue;
  }
}
