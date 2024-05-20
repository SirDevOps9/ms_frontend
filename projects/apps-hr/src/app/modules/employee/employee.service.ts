import {
  LanguageService,
  LoaderService,
  ToasterService,
  PageInfo,
  PageInfoResult,
} from 'shared-lib';
import { EmployeeProxy } from './employee.proxy';
import { Injectable } from '@angular/core';
import { AddEmployeePersonal } from './models';
import { BehaviorSubject, map } from 'rxjs';
import { EmployeeDto } from './models/employeeDto';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeeDataSource = new BehaviorSubject<EmployeeDto[]>([]);

  public employeesList = this.employeeDataSource.asObservable();

  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});

  initEmployeesList(searchTerm: string, pageInfo: PageInfo) {
    this.employeeProxy.getAllPaginated(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.employeeDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
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
      },
      error: () => {
        this.loaderService.hide();
      },
    });
  }

  constructor(
    private employeeProxy: EmployeeProxy,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService
  ) {}
}
