import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FilterDto,
  LanguageService,
  PageInfo,
  PageInfoResult,
  RouterService,
  lookupDto,
} from 'shared-lib';
import { EmployeeDto } from '../../models/employeeDto';
import { Title } from '@angular/platform-browser';
import { EmployeeService } from '../../employee.service';
import { ExportService } from 'libs/shared-lib/src/lib/export/exportService';

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
  exportData: EmployeeDto[];
  cols: any[] = [];
  active: boolean = false;
  currentPageInfo: PageInfoResult;
  searchTerm: string;
  exportColumns: lookupDto[];
  exportSelectedCols: string[] = [];

  constructor(
    private routerService: RouterService,
    private titleService: Title,
    private languageService: LanguageService,
    private employeeService: EmployeeService
  ) {}
  ngOnInit() {
    this.titleService.setTitle('Employee List');
    this.languageService.getTranslation('Employee.List.Employees').subscribe((title) => {
      this.titleService.setTitle(title);
    });
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
    this.exportColumns = this.cols.map((col) => ({
      id: col.header,
      name: col.field,
    }));
  }
  convertToCSV(objArray: any[]): string {
    const array = [Object.keys(objArray[0])].concat(objArray);

    return array
      .map((row) => {
        return Object.values(row).toString();
      })
      .join('\n');
  }

  exportToCSV() {
    this.employeeService.exportEmployeesList(this.searchTerm);
    var data: any;

    this.employeeService.employeesList.subscribe((res) => {
      data = res;
    });
    const csvData = this.convertToCSV(data);
    this.downloadCSV(csvData, this.titleService.getTitle() + Date.now() + '.csv');
  }

  downloadCSV(csvData: string, filename: string) {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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

  exportEmployeeData(searchTerm: string) {
    this.employeeService.exportsEmployeesList(searchTerm);

    this.employeeService.exportedEmployeesList.subscribe((res) => {
      this.exportData = res;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    console.log(pageInfo);
    this.initEmployeeData('', pageInfo);
  }
  navigateToAdd() {
    this.routerService.navigateTo(`/masterdata/employee/add`);
  }
  navigateToEdit(id: number) {
    this.routerService.navigateTo(`/masterdata/employee/edit/${id}`);
  }
  navigateToView(id: number) {
    this.routerService.navigateTo(`/masterdata/employee/view/${id}`);
  }
  deletEmployee(id: number) {
    this.employeeService.deleteEmployee(id);
  }

  searchTermChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
    this.initEmployeeData(this.searchTerm, new PageInfo());
  }

  exportClick(e?: Event) {
    this.exportEmployeeData(this.searchTerm);
  }
  exportExcel() {
    // let filterDto : FilterDto = new FilterDto();
    // console.log(filterDto)
    // this.exportEmployeeData(filterDto);
    // ExportService.ToExcel(this.exportData, 'Employee-List.xlsx' , this.exportSelectedCols);
  }

  public exportPDF(): void {
    // let filterDto : FilterDto = new FilterDto();
    // this.exportEmployeeData(filterDto);
    // ExportService.ToPDF(this.exportData, 'Employee-List.pdf'  , this.exportSelectedCols);
  }
}
