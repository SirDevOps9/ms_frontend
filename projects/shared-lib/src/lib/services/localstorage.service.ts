import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class StorageService {
  setItem(keyName: string, keyValue: any) {
    localStorage.setItem(keyName, JSON.stringify(keyValue));
  }
  getItem(keyName: string) {
    const item = localStorage.getItem(keyName);
    if (item) return JSON.parse(item);
    return null;
  }

  deleteItem(keyName: string) {
    localStorage.removeItem(keyName);
  }
  clearAll() {
    localStorage.clear();
    sessionStorage.clear();
  }
}
