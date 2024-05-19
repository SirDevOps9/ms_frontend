import { Component, OnInit } from '@angular/core';
import { RouterService } from 'shared-lib';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  ngOnInit() {}

  navigateToAdd() {
    this.routerService.navigateTo(`/employee/add`);
  }

  constructor(private routerService: RouterService) {}
}
