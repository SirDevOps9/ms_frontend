import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
sendColumns = new BehaviorSubject<any>(null)
sendColumnsObs = this.sendColumns.asObservable()
  constructor() { }
}
