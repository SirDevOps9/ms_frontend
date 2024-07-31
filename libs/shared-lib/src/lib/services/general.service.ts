import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
sendColumns = new BehaviorSubject<any>(null)
sendColumnsObs = this.sendColumns.asObservable()
sendFilteredList= new BehaviorSubject<any>(null)
sendFilteredListObs = this.sendFilteredList.asObservable()
sendSelectedColumns= new BehaviorSubject<any>(null)
sendSelectedColumnsObs = this.sendSelectedColumns.asObservable()
sendFullColumns = new BehaviorSubject<any>([])
sendFullColumnsObs = this.sendFullColumns.asObservable()

  constructor() { }
}
