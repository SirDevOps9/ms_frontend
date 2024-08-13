import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { BehaviorSubject, debounceTime, Observable } from 'rxjs';

@Injectable({ 
  providedIn: 'root'
})
export class GeneralService {
  fraction : string = '1.1-2'
sendColumns = new BehaviorSubject<any>(null)
sendColumnsObs = this.sendColumns.asObservable()
sendFilteredList= new BehaviorSubject<any>([])
sendFilteredListObs = this.sendFilteredList.asObservable()
sendSelectedColumns= new BehaviorSubject<any>(null)
sendSelectedColumnsObs = this.sendSelectedColumns.asObservable()
sendFullColumns = new BehaviorSubject<any>([])
sendFullColumnsObs = this.sendFullColumns.asObservable()

sendPageChanges = new BehaviorSubject<any>(null)
sendPageChangesObs = this.sendPageChanges.asObservable()

sendPageChangesFromMainPagination = new BehaviorSubject<any>(null)
sendPageChangesFromMainPaginationsObs = this.sendPageChanges.asObservable()

sendSideBarState = new BehaviorSubject<boolean>(false)


  constructor() { 
    
  }


  private dirtyTouchedGroups: { index: number, value: any }[] = [];

  getDirtyTouchedGroups(formArray: FormArray): any[] {
    this.dirtyTouchedGroups = []; // Reset before each run
    formArray.controls.forEach((control, index) => {
      if ((control as FormGroup).dirty ) {
        this.dirtyTouchedGroups.push({ index, value: control.value });
      }
    });
    return this.filterDuplicatesAndMap();
  }

  private filterDuplicatesAndMap(): any[] {
    const uniqueGroups = new Map();
    this.dirtyTouchedGroups.forEach(item => {
      uniqueGroups.set(item.index, item.value);
    });
    return Array.from(uniqueGroups.values());
  }

  formatNumber(value: any, fractionDigits: string = this.fraction) {
    const formattedNumber = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: parseInt(fractionDigits.split('-')[0], 10),
      maximumFractionDigits: parseInt(fractionDigits.split('-')[1], 10),
    }).format(value);

    return formattedNumber;
  }


}