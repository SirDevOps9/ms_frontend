import { Component, OnInit, ViewChild } from '@angular/core';
import { LanguageService, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { EmployeeDto } from '../../models/employeeDto';
import { Title } from '@angular/platform-browser';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: EmployeeDto[];
  @ViewChild('myTab') myTab: any | undefined;
  selectedEntries: EmployeeDto[];
  tableData: EmployeeDto[];
  cols: any[] = [];
  active: boolean = false;
  currentPageInfo: PageInfoResult;
  searchTerm: string;

  constructor(
    private routerService: RouterService,
    private titleService: Title,
    private languageService: LanguageService,
    private employeeService: EmployeeService
  ) {}
  ngOnInit() {
    this.titleService.setTitle(this.languageService.transalte('Employee.List.Employees'));
    this.initEmployeeData(this.searchTerm, new PageInfo());
    this.cols = [
      {
        field: 'Id',
        header: 'Id',
      },
      {
        field: 'Employee Code',
        header: 'EmployeeCode',
      },

      {
        field: 'Attendance Code',
        header: 'AttendanceCode',
      },
      {
        field: 'Employee Name',
        header: 'EmployeeName',
      },
      {
        field: 'Employee Photo',
        header: 'EmployeePhoto',
      },
    ];
  }

  initEmployeeData(searchTerm: string, page: PageInfo) {
    this.employeeService.initEmployeesList(searchTerm, page);

    this.employeeService.employeesList.subscribe((res) => {
      this.tableData = res;
    });

    this.employeeService.currentPageInfo.subscribe((res) => {
      this.currentPageInfo = res;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    console.log(pageInfo);
    this.initEmployeeData('', pageInfo);
  }
  navigateToAdd() {
    this.routerService.navigateTo(`/employee/add`);
  }
  navigateToEdit(id: number) {
    this.routerService.navigateTo(`/employee/edit/${id}`);
  }
  navigateToView(id: number) {
    this.routerService.navigateTo(`/employee/view/${id}`);
  }
  deletEmployee(id: number) {
    this.employeeService.deleteEmployee(id);
  }

  searchTermChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
    this.initEmployeeData(this.searchTerm, new PageInfo());
  }

}
