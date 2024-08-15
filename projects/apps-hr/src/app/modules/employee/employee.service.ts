import {
  LanguageService,
  LoaderService,
  ToasterService,
  PageInfo,
  PageInfoResult,
  FilterDto,
} from 'shared-lib';
import { EmployeeProxy } from './employee.proxy';
import { Injectable } from '@angular/core';
import {
  AddEmployeePersonal,
  CityDto,
  CountryDto,
  EditEmployeePersonal,
  EmployeeDto,
  NationalityDto
} from './models';
import { BehaviorSubject, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeeDataSource = new BehaviorSubject<EmployeeDto[]>([]);

  private allEmployeeDataSource = new BehaviorSubject<EmployeeDto[]>([]);

  private exportedEmployeeDataSource = new BehaviorSubject<EmployeeDto[]>([]);


  public allEmployeeList = this.allEmployeeDataSource.asObservable();


  public employeesList = this.employeeDataSource.asObservable();

  public exportedEmployeesList = this.employeeDataSource.asObservable();


  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});

  private countryDataSource = new BehaviorSubject<CountryDto[]>([]);
  public countries = this.countryDataSource.asObservable();

  private cityDataSource = new BehaviorSubject<CityDto[]>([]);
  public cities = this.cityDataSource.asObservable();

  private nationalityDataSource = new BehaviorSubject<NationalityDto[]>([]);
  public nationalities = this.nationalityDataSource.asObservable();


  public addEmployeeStatus = new BehaviorSubject<boolean>(false);

  public editEmployeeStatus = new BehaviorSubject<boolean>(false);

  initEmployeesList(searchTerm: string, pageInfo: PageInfo) {
    this.employeeProxy.getAllPaginated(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.employeeDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }
  exportsEmployeesList(searchTerm:string | undefined) {
    this.employeeProxy.export(searchTerm).subscribe({
      next: (res) => {
        this.exportedEmployeeDataSource.next(res);
      },
    });
  }
  exportEmployeesList(searchTerm: string) {
    const pageInfo = new PageInfo;
    pageInfo.pageSize = -1;
    this.employeeProxy.getAllPaginated(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.allEmployeeDataSource.next(res.result);
      },
    });
  }
  loadCountries() {
    this.employeeProxy.getAllCountries().subscribe((response) => {
      this.countryDataSource.next(response);
    });
  }

  loadCities(countryCode: string) {
    this.employeeProxy.getCities(countryCode).subscribe((response) => {
      this.cityDataSource.next(response);
    });
  }

  loadNationalities() {
    this.employeeProxy.getAllNationalities().subscribe((response) => {
      this.nationalityDataSource.next(response);
    });
  }
  addEmployee(model: AddEmployeePersonal) {
    this.loaderService.show();
    this.employeeProxy.addEmployee(model).subscribe({
      next: () => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Employee.Success'),
          this.languageService.transalte('Employee.EmployeeAddedSuccessfully')
        );
        this.loaderService.hide();
        this.addEmployeeStatus.next(true);
      },
      error: () => {
        this.loaderService.hide();
        this.addEmployeeStatus.next(false);
      },
    });
  }

  editEmployee(model: EditEmployeePersonal) {
    this.loaderService.show();

    this.employeeProxy.editEmployee(model).subscribe({
      next: () => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Employee.Success'),
          this.languageService.transalte('Employee.EmployeeEditedSuccessfully')
        );
        this.loaderService.hide();
        this.editEmployeeStatus.next(true);
      },
      error: () => {
        this.loaderService.hide();
        this.editEmployeeStatus.next(false);
      },
    });
  }
  getEmployeeById(Id: number) {
    return this.employeeProxy.getEmployeeById(Id).pipe(
      map((res) => {
        return res;
      }),
      catchError((err: string) => {
        throw err!;
      })
    );
  }

  getEmployeeView(Id: number) {
    return this.employeeProxy.getEmployeeView(Id).pipe(
      map((res) => {
        return res;
      }),
      catchError((err: string) => {
        throw err!;
      })
    );
  }

  async deleteEmployee(employeeId: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.employeeProxy.deleteEmployee(employeeId).subscribe({
        next: () => {
          this.toasterService.showSuccess(
            this.languageService.transalte('Employee.Success'),
            this.languageService.transalte('Employee.EmployeeDeletedSuccessfully')
          );
          this.loaderService.hide();
          const currentEmployees = this.employeeDataSource.getValue();
          const updatedEmployees = currentEmployees.filter(
            (Employees) => Employees.id !== employeeId
          );
          this.employeeDataSource.next(updatedEmployees);
        },
      });
    }
  }

  constructor(
    private employeeProxy: EmployeeProxy,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService
  ) { }
}
