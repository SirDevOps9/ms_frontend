import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  constructor() {}
  firstDayOfMonth(): string {
    // const date = new Date();
    // const year = date.getFullYear();
    // const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 since getMonth() returns 0-11
    // const day = '01'; // First day of the month

    // const formattedDate = `${year}-${month}-${day}`;
    
    // return formattedDate;
    var date = new Date();
 const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 since getMonth() returns 0-11

    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
     const formattedDate = `${date.getFullYear}-${date.getMonth}-${date.getDay}`;
     return formattedDate
  }

   lastDayOfMonth(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Adding 1 since getMonth() returns 0-11

    // Creating a new date object for the first day of the next month
    const nextMonthDate = new Date(year, month, 1);
    
    // Subtracting one day to get the last day of the current month
    nextMonthDate.setDate(nextMonthDate.getDate() - 1);
    
    const lastDay = String(nextMonthDate.getDate()).padStart(2, '0');
    const formattedMonth = String(nextMonthDate.getMonth() + 1).padStart(2, '0');
    const formattedDate = `${year}-${formattedMonth}-${lastDay}`;
    
    return formattedDate;
}

}



