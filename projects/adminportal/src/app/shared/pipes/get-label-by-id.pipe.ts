import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getLabelById'
})
export class GetLabelByIdPipe implements PipeTransform {

  transform(itemId: any, itemList: any): any {
    console.log(itemList)
    return itemList?.length && itemId && itemList?.find((elem : any) => elem?.id == itemId) || null;
  }

}
