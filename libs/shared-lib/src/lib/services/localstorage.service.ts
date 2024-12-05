import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class StorageService {
  setItem(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {}
  }

  getItem(key: string): any {
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (error) {
        return null;
      }
    } else {
      return null;
    }
  }

  deleteItem(keyName: string) {
    localStorage.removeItem(keyName);
  }
  clearAll() {
    localStorage.clear();
    sessionStorage.clear();
  }
}
