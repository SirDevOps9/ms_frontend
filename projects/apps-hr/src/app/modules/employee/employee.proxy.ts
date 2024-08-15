import { Injectable } from '@angular/core';
import { AddEmployeePersonal, CityDto, CountryDto, EditEmployeePersonal, EmployeeDto, GetEmployeeById } from './models';
import { Observable } from 'rxjs';
import { FilterDto, HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { NationalityDto } from './models/nationality-dto';
import { GetEmployeeView } from './models/get-employee-view';

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
  export(
    searchTerm: string | undefined
  ): Observable<EmployeeDto[]> {
    let query = `Employee/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
     return this.httpService.get<EmployeeDto[]>(query);
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
  getAllCountries(): Observable<CountryDto[]> {
    return this.httpService.get<CountryDto[]>(`Country`);
  }
  getCities(countryCode: string): Observable<CityDto[]> {
    return this.httpService.get<CityDto[]>(`Country/GetCities?CountryCode=${countryCode}`);
  }
  getAllNationalities(): Observable<NationalityDto[]> {
    return this.httpService.get<NationalityDto[]>(`Country/GetNationality`);
  }

  getEmployeeView(id: number): Observable<GetEmployeeView> {
    return this.httpService.get<GetEmployeeView>(`Employee/View?Id=${id}`);
  }
  constructor(private httpService: HttpService) {}
}
