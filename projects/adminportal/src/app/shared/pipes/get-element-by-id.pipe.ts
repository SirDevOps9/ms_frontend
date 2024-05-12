import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getElementById',
})
export class GetElementByIdPipe implements PipeTransform {
  transform(itemId: any, itemList: any): any {
    return itemList?.length && itemId && itemList?.find((elem : any) => elem?.value == itemId) || null;
  }
}
