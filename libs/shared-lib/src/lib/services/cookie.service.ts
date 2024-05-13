
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
@Injectable({ providedIn: 'root' })
export class CookieStorageService {
    constructor(private cookieService:CookieService){

    }
  setItem(keyName: string, keyValue: any) {
    this.cookieService.put(keyName,JSON.stringify(keyValue));
  }
  getItem(keyName: string) {
    const item = this.cookieService.get(keyName);
    if (item) return JSON.parse(item);
    return null;
  }

  deleteItem(keyName: string) {
    this.cookieService.remove(keyName);
  }
  clearAll() {
    this.cookieService.removeAll();
  }
}
