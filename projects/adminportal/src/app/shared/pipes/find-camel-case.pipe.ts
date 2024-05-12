import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findCamelCase',
})
export class FindCamelCasePipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    const data = value.split(/(?=[A-Z])/); // Split on capital letters (camel case)
    for (let i = 0; i < data.length; i++) {
      data[i] = data[i].charAt(0).toUpperCase() + data[i].slice(1).toLowerCase();
    }
    return data.join(' ');
  }
}
