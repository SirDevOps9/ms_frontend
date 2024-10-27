import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  formatItemAttributes(data: any[]): any[] {
    return data.map(item => ({
      ...item,
      itemAttributes: item.itemAttributes
        ? item.itemAttributes.map((attr: { nameAr: string, nameEn: string }) => `${attr.nameAr} (${attr.nameEn})`).join(', ')
        : ''
    }));
  }
}
