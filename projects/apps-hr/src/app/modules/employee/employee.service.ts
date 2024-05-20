import {
  LanguageService,
  LoaderService,
  ToasterService,
  PageInfo,
  PageInfoResult,
} from 'shared-lib';
import { EmployeeProxy } from './employee.proxy';
import { Injectable } from '@angular/core';
import { AddEmployeePersonal, EditEmployeePersonal } from './models';
import { BehaviorSubject, catchError, map } from 'rxjs';
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

  editEmployee(model: EditEmployeePersonal) {
    this.loaderService.show();
    this.employeeProxy.editEmployee(model).subscribe({
      next: () => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Employee.Success'),
          this.languageService.transalte('Employee.EmployeeEditedSuccessfully')
        );
        this.loaderService.hide();
      },
      error: () => {
        this.loaderService.hide();
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

  async deleteEmployee(employeeId: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.employeeProxy.deleteEmployee(employeeId).subscribe({
        next: () => {
          this.toasterService.showSuccess(
            this.languageService.transalte('Success'),
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
    } else {
    }
  }

  constructor(
    private employeeProxy: EmployeeProxy,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService
  ) {}
}
