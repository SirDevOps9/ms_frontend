import { Injectable } from '@angular/core';
import { HttpService } from 'shared-lib';
import { AddEmployeePersonal } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeProxy {

  addEmployee(employeeModel: AddEmployeePersonal): Observable<boolean> {
    return this.httpService.post<boolean>(
      `Employee/AddPersonal`,
      employeeModel
    );
  }
  constructor(private httpService: HttpService) {}
}
