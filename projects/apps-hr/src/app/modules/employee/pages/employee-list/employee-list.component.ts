import { Component, OnInit, ViewChild } from '@angular/core';
import { LanguageService, PageInfo, RouterService } from 'shared-lib';
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
  currentPageInfo: PageInfo = new PageInfo();
  searchTerm: string;


  constructor(
    private routerService: RouterService,
    private titleService: Title,
    private languageService: LanguageService,
    private EmployeeService: EmployeeService,
  ) { }
  ngOnInit() {

    this.titleService.setTitle(
      this.languageService.transalte('Employee.EmployeeList')
    );
    this.initEmployeeData(this.searchTerm,this.currentPageInfo);
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

    this.EmployeeService.getAllEmployeesPaginated(searchTerm,page).subscribe({
      next: (EmployeeList: any) => {
        this.tableData = EmployeeList.result;

        //this.tableData = this.convertToTreeNode(journalList);
        console.log('this.tableData', this.tableData);

      },
    });
  }

  onPageChange(searchTerm: string, pageInfo: PageInfo) {
    console.log(pageInfo);
    this.initEmployeeData(searchTerm,pageInfo)
  }
  navigateToAdd() {
    this.routerService.navigateTo(`/employee/add`);
  }

}
