import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { RouterService } from 'shared-lib';
import { GetEmployeeById } from '../../models';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  employee?: GetEmployeeById;

  ngOnInit() {
    this.loadEmployee();
  }

  loadEmployee() {
    const employeeId = this.routerService.currentId; 
    this.employeeService.getEmployeeById(employeeId).subscribe((res) => {
      this.employee = res;
    });
  }
  calculateAge(birthDate?: Date): string {
    if (!birthDate) return '';
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age.toString();
  }
  constructor(
    private employeeService: EmployeeService,
    private routerService: RouterService
  ) {}
}
