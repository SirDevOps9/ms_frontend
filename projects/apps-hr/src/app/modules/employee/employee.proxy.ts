import { Injectable } from '@angular/core';
import { AddEmployeePersonal } from './models';
import { Observable } from 'rxjs';
import { EmployeeDto } from './models/employeeDto';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';



@Injectable({
  providedIn: 'root',
})
export class EmployeeProxy {

  getAllPaginated(
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<EmployeeDto>> {
    const x = this.httpService.get<PaginationVm<EmployeeDto>>(
      `Employee`
    );
    console.log('Result', x);
    return x
  }

  addEmployee(employeeModel: AddEmployeePersonal): Observable<boolean> {
    return this.httpService.post<boolean>(
      `Employee/AddPersonal`,
      employeeModel
    );
  }
  constructor(private httpService: HttpService) {}
}
