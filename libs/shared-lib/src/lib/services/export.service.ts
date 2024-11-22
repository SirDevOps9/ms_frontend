import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private LanguageService:TranslateService) { }

  formatItemAttributes(data: any[], columns: { name: string, headerText: string }[]): any[] {
    return data.map(item => {
      const formattedItem: { [key: string]: any } = {};

      columns.forEach(column => {
        if (column.name === 'itemAttributes' && item.itemAttributes) {
          const nameEnAttributes = item.itemAttributes
            .map((attr: { nameEn: string }) => attr.nameEn)
            .join(', ');

          const nameArAttributes = item.itemAttributes
            .map((attr: { nameAr: string }) => attr.nameAr)
            .join(', ');
            formattedItem[`${column.headerText} ${this.LanguageService.instant('global.English')}`] = nameEnAttributes;
           formattedItem[`${column.headerText} ${this.LanguageService.instant('global.Arabic')}`] = nameArAttributes;

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
        if (column.name === 'itemAttributes' && item.itemAttributes) {
          formattedItem[column.headerText] = item.itemAttributes
            .map((attr: { nameAr: string, nameEn: string }) => `${attr.nameAr} (${attr.nameEn})`)
            .join(', ');
        } else if (item.hasOwnProperty(column.name) && Array.isArray(item[column.name])) {
          formattedItem[column.headerText] = item[column.name].join(', ');
        } else {
          formattedItem[column.headerText] = item[column.name];
        }
      });

      return formattedItem;
    });
  }


}
