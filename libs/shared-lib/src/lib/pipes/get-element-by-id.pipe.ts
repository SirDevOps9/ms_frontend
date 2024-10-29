import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getElementByID',
})
export class GetElementByIDPipe implements PipeTransform {

  transform(itemId: any, list: any[]): any {

    if (list && itemId) {
      return list.find((elem: any) => elem?.id == itemId);
    }
    return undefined;
  }

}
