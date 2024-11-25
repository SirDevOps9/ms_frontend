import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(    private translate: TranslateService,
  ) { }

  formatItemAttributes(data: any[], columns: { name: string, headerText: string }[]): any[] {
    return data.map(item => {
      const formattedItem: { [key: string]: any } = {};
      columns.forEach(column => {
        if (column.name === 'itemAttributes' && item.itemAttributes) {
          formattedItem[column.headerText] = item.itemAttributes
            .map((attr: { nameAr: string, nameEn: string }) => `${attr.nameAr} (${attr.nameEn})`)
            .join(', ');
        } else {
          formattedItem[column.headerText] = item[column.name];
        }
      });

      return formattedItem;
    });
  }

  formatCiloma(data: any[], columns: { name: string, headerText: string }[]): any[] {
    return data.map(item => {
      const formattedItem: { [key: string]: any } = {};

      columns.forEach(column => {
        const translatedHeader = this.translate.instant(column.headerText);
        formattedItem[translatedHeader] = item.hasOwnProperty(column.name) ? item[column.name] : null;
      });

      return formattedItem;
    });
  }


}
