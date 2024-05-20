import { Injectable } from '@angular/core';
import { AddEmployeePersonal, EditEmployeePersonal, EmployeeDto, GetEmployeeById } from './models';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';

@Injectable({
  providedIn: 'root',
})
export class EmployeeProxy {
  getAllPaginated(
    searchTerm: string | undefined,
    pageInfo: PageInfo
  ): Observable<PaginationVm<EmployeeDto>> {
    let query = `Employee?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<EmployeeDto>>(query);
  }

  addEmployee(employeeModel: AddEmployeePersonal): Observable<boolean> {
    return this.httpService.post<boolean>(`Employee/AddPersonal`, employeeModel);
  }

  getEmployeeById(id: number): Observable<GetEmployeeById> {
    return this.httpService.get<GetEmployeeById>(`Employee/GetById?id=${id}`);
  }

  editEmployee(employeeModel: EditEmployeePersonal): Observable<boolean> {
    return this.httpService.put<boolean>(`Employee/EditPersonal`, employeeModel);
  }

  deleteEmployee(id: number): Observable<boolean> {
    return this.httpService.delete<boolean>(`Employee/Delete?id=${id}`);
  }

  constructor(private httpService: HttpService) {}
}
