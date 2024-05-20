import { LanguageService, LoaderService, ToasterService, PageInfo } from "shared-lib";
import { EmployeeProxy } from "./employee.proxy";
import { Injectable } from "@angular/core";
import { AddEmployeePersonal } from "./models";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class EmployeeService {

  getAllEmployeesPaginated(searchTerm: string, pageInfo: PageInfo) {
    return this.employeeProxy.getAllPaginated(searchTerm, pageInfo).pipe(
      map((res) => {
        return res;
      })
    );
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
