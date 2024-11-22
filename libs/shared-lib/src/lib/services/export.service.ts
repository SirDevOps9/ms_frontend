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
        if (column.name === 'itemAttributes' && item.itemAttributes) {
          // Format the itemAttributes the same way as the formatItemAttributes function
          formattedItem[column.headerText] = item.itemAttributes
            .map((attr: { nameAr: string, nameEn: string }) => `${attr.nameAr} (${attr.nameEn})`)
            .join(', ');
        } else if (item.hasOwnProperty(column.name) && Array.isArray(item[column.name])) {
          // Join array items with ', ' if it's an array
          formattedItem[column.headerText] = item[column.name].join(', ');
        } else {
          formattedItem[column.headerText] = item[column.name];
        }
      });

      return formattedItem;
    });
  }


}
