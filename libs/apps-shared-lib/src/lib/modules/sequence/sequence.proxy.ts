import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';

@Injectable({
  providedIn: 'root',
})
export class sequenceProxy {
  constructor(private baseService: HttpService) {}
  getBranch(): Observable<{ id: number; name: string }[]> {
    return this.baseService.get(`Branch/BranchDropDown`);
  }
  getCompany(): Observable<{ id: number; name: string }[]> {
    return this.baseService.get(`Company/CompanyDropdown`);
  }
  getSequence(screen:string): Observable<any> {
    return this.baseService.get(`Sequence/${screen}`);
  }
 addSequence(sequence:any) {
  return this.baseService.post('Sequence', sequence);
 }

}
