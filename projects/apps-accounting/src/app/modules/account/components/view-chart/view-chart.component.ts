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
  Mandatory: boolean = false;
  Optional: boolean = false;
  NotAllow: boolean = false;
  accountLevel?: string;
  accountTags?: string;
  accountCompanies?: string;
  parent?: AccountByIdDto;
  constructor(private accountService: AccountService) {}
  ngOnInit() {}
  getAccountDetails(id: number) {
    this.accountService.getAccountDetails(id);
    this.accountService.AccountViewDetails.subscribe((res) => {
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

    });
  
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['account']) {

      // Your logic here
      this.parent = this.account;
      console.log(this.parent , "this.parent");

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

      if (this.parent.costCenterConfig === 'Mandatory') {
        console.log("MandatoryMandatoryMandatory");
        
        this.Mandatory = true;
        this.NotAllow = false;
        this.Optional = false;
      } else if (this.parent.costCenterConfig === 'NotAllow') {
        this.NotAllow = true;
        this.Mandatory = false;
        this.Optional = false;
      } else if (this.parent.costCenterConfig === 'Optional') {
        this.Optional = true;
        this.Inactive = false;
        this.Mandatory = false;
      }
      this.accountLevel = this.parent?.accountLevel?.toString();
      this.accountTags = this.parent?.accountTags?.join('  ');
      this.accountCompanies = this.parent?.accountCompanies?.join('  ');
      //console.log('Account changed:', changes['account'].currentValue);
    }
  }
}
