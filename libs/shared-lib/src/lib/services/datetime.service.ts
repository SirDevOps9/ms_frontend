import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  constructor() { }
  firstDayOfMonth(): string {
    var date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 since getMonth() returns 0-11
    const firstDay = `01`; // Always set the day to '01'

    const formattedDate = `${date.getFullYear()}-${month}-${firstDay}`;
    return formattedDate;;
  }

  lastDayOfMonth(): string {
    var date = new Date();
    var nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    nextMonth.setDate(nextMonth.getDate() - 1);

    const month = String(nextMonth.getMonth() + 1).padStart(2, '0'); // Adding 1 since getMonth() returns 0-11
    const day = String(nextMonth.getDate()).padStart(2, '0'); // Pad day to two digits

    const formattedDate = `${nextMonth.getFullYear()}-${month}-${day}`;
    return formattedDate;
  }

}
