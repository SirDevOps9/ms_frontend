import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  setItem(keyName: string, keyValue: any) {
    sessionStorage.setItem(keyName, JSON.stringify(keyValue));
  }
  getItem(keyName: string) {
    const item = sessionStorage.getItem(keyName);
    if (item) return JSON.parse(item);
    return null;
  }

  deleteItem(keyName: string) {
    sessionStorage.removeItem(keyName);
  }
  clearAll() {
    sessionStorage.clear();
  }
}
