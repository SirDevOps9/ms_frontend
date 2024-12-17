import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor(private LanguageService: TranslateService) {}
  // this is function format data to (YYYY/MM/dd)
  private formatDate(date: string | Date): string {
    if (!date) return '';
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }
  // this is function format temAttributes list array
  formatItemAttributes(data: any[], columns: { name: string; headerText: string }[]): any[] {
    return data.map((item) => {
      const formattedItem: { [key: string]: any } = {};

      columns.forEach((column) => {
        if (column.name === 'itemAttributes' && item.itemAttributes) {
          const nameEnAttributes = item.itemAttributes
            .map((attr: { nameEn: string }) => attr.nameEn)
            .join(', ');

          const nameArAttributes = item.itemAttributes
            .map((attr: { nameAr: string }) => attr.nameAr)
            .join(', ');

          formattedItem[
            `${this.LanguageService.instant(column.headerText)} ${this.LanguageService.instant(
              'global.English'
            )}`
          ] = nameEnAttributes;
          formattedItem[
            `${this.LanguageService.instant(column.headerText)} ${this.LanguageService.instant(
              'global.Arabic'
            )}`
          ] = nameArAttributes;
        } else if (column.name === 'createdOn' && item[column.name]) {
          formattedItem[this.LanguageService.instant(column.headerText)] = this.formatDate(
            item[column.name]
          );
        } else {
          formattedItem[this.LanguageService.instant(column.headerText)] = item[column.name];
        }
      });

      return formattedItem;
    });
  }

  // this is function format Ciloma header tabel list
  formatCiloma(data: any[], columns: { name: string; headerText: string }[]): any[] {
    return data.map((item) => {
      const formattedItem: { [key: string]: any } = {};

      columns.forEach((column) => {
        const value = item[column.name];

        if (column.name === 'itemAttributes' && value) {
          formattedItem[this.LanguageService.instant(column.headerText)] = value
            .map((attr: { nameAr: string; nameEn: string }) => `${attr.nameAr} (${attr.nameEn})`)
            .join(', ');
        } else if (Array.isArray(value)) {
          formattedItem[this.LanguageService.instant(column.headerText)] = value.join(', ');
        } else if (
          column.name === 'createdOn' ||
          column.name === 'receiptDate' ||
          column.name === 'invoiceDate' ||
          (column.name === 'returnInvoiceDate' && item[column.name])
        ) {
          formattedItem[this.LanguageService.instant(column.headerText)] = this.formatDate(
            item[column.name]
          );
        } else {
          formattedItem[this.LanguageService.instant(column.headerText)] = value;
        }
      });

      return formattedItem;
    });
  }
}
