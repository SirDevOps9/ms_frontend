import { Component, Input, SimpleChanges } from '@angular/core';
import { AccountByIdDto } from '../../models';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-view-chart',
  templateUrl: './view-chart.component.html',
  styleUrl: './view-chart.component.scss',
})
export class ViewChartComponent {
  @Input() parentAddedId: number;
  @Input() account: AccountByIdDto;
  checked: boolean = true;
  yes: boolean = false;
  Active: boolean = false;
  Inactive: boolean = false;
  Period: boolean = false;
  accountLevel?: string;
  accountTags?: string;
  accountCompanies?: string;
  parent?: AccountByIdDto;
  constructor(private accountService: AccountService) {}
  ngOnInit() {}
  getAccountDetails(id: number) {
    this.accountService.getAccountDetails(id);
    this.accountService.AccountViewDetails.subscribe((res) => {
     // console.log(res);
      this.parent = res;
      if (this.parent.hasNoChild === true) {
        this.yes = true;
      } else {
        this.yes = false;
      }

      if (this.parent.accountActivation === 'Active') {
        this.Active = true;
      } else if (this.parent.accountActivation === 'inactive') {
        this.Inactive = true;
      } else if (this.parent.accountActivation === 'periodic Active') {
        this.Period = true;
      }

     // console.log(this.parent);
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['account']) {
      // Your logic here
      this.parent = this.account;
      if (this.parent.hasNoChild === true) {
        this.yes = true;
      } else {
        this.yes = false;
      }

      if (this.parent.accountActivation === 'Active') {
        this.Active = true;
        this.Inactive = false;
        this.Period = false;
      } else if (this.parent.accountActivation === 'Inactive') {
        this.Inactive = true;
        this.Active = false;
        this.Period = false;
      } else if (this.parent.accountActivation === 'PeriodicActive') {
        this.Period = true;
        this.Inactive = false;
        this.Active = false;
      }
      this.accountLevel = this.parent?.accountLevel?.toString();
      this.accountTags = this.parent?.accountTags?.join('  ');
      this.accountCompanies = this.parent?.accountCompanies?.join('  ');
      //console.log('Account changed:', changes['account'].currentValue);
    }
  }
}
