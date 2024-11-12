import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

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
        formattedItem[column.headerText] = item.hasOwnProperty(column.name) ? item[column.name] : null;
      });

      return formattedItem;
    });
  }



}
