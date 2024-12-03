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
    return data.map(item => {
      const formattedItem: { [key: string]: any } = {};

      columns.forEach(column => {
        const value = item[column.name];

        if (column.name === 'itemAttributes' && value) {
          formattedItem[this.LanguageService.instant(column.headerText).trim()] = value
            .map((attr: { nameAr: string; nameEn: string }) => `${attr.nameAr.trim()} (${attr.nameEn.trim()})`)
            .join(' , ');
        } else if (Array.isArray(value)) {
          formattedItem[this.LanguageService.instant(column.headerText).trim()] = value.map(v => v.trim())
        } else if (!isNaN(Date.parse(value))) {
          formattedItem[this.LanguageService.instant(column.headerText).trim()] = this.formatDate(value);
        } else {
          formattedItem[this.LanguageService.instant(column.headerText).trim()] = value?.trim() || '';
        }
      });


      return formattedItem;
    });
  }


 // this is function format Ciloma header tabel list
 formatCiloma(data: any[], columns: { name: string; headerText: string }[]): any[] {
  return data.map(item => {
    const formattedItem: { [key: string]: any } = {};

    columns.forEach(column => {
      const value = item[column.name];

      if (column.name === 'itemAttributes' && value) {
        formattedItem[this.LanguageService.instant(column.headerText)] = value
          .map((attr: { nameAr: string; nameEn: string }) => `${attr.nameAr} (${attr.nameEn})`)
          .join(', ');
      } else if (Array.isArray(value)) {
        formattedItem[this.LanguageService.instant(column.headerText)] = value.join('   ,   ');
      } else if (!isNaN(Date.parse(value))) {
        // Check if the value is a valid date
        formattedItem[this.LanguageService.instant(column.headerText)] = this.formatDate(value);
      } else {
        formattedItem[this.LanguageService.instant(column.headerText)] = value;
      }
    });

    return formattedItem;
  });
}


}
