import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { AgeService, RouterService } from 'shared-lib';
import { GetEmployeeView } from '../../models';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss'],
  providers: [RouterService],
})
export class ViewEmployeeComponent implements OnInit {
  employee?: GetEmployeeView;

  ngOnInit() {
    this.loadEmployee();
    this.titleService.setTitle('View Employee');

  }

  loadEmployee() {
    const employeeId = this.routerService.currentId;
    this.employeeService.getEmployeeView(employeeId).subscribe((res) => {
      this.employee = res;
    });
  }

  constructor(
    private employeeService: EmployeeService,
    private routerService: RouterService,
    public ageService: AgeService,
    private titleService: Title

  ) {}
}
