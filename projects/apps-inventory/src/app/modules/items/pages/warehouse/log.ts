import { Injectable } from '@angular/core';
import { environment } from 'projects/apps-inventory/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DebugService {
  private logs: string[] = [];

  constructor() {}

  // تسجيل الرسائل فقط إذا كانت البيئة غير الإنتاج
  log(message: any): void {
    if (environment.production === false) {
      this.logs.push(message);
      console.log(message);
    }
  }

  // مسح الرسائل المخزنة
  clearLogs(): void {
    this.logs = [];
  }

  // يمكن استخدامه لجلب الرسائل في حال الحاجة
  getLogs(): string[] {
    return this.logs;
  }
}
