import { Injectable } from '@angular/core';
import { AddEmployeePersonal, EmployeeDto } from './models';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';

@Injectable({
  providedIn: 'root',
})
export class EmployeeProxy {
getAllPaginated(searchTerm: string | undefined, pageInfo: PageInfo): Observable<PaginationVm<EmployeeDto>> {
  let query = `Employee?${pageInfo.toQuery}`;
  if (searchTerm) {
    query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
  }
  return this.httpService.get<PaginationVm<EmployeeDto>>(query);
}

  addEmployee(employeeModel: AddEmployeePersonal): Observable<boolean> {
    return this.httpService.post<boolean>(`Employee/AddPersonal`, employeeModel);
  }
  constructor(private httpService: HttpService) {}
}
