import { Component, Input, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { LanguageService } from 'shared-lib';
import { AddItemCategory } from '../../../models';
import { ItemsService } from '../../../items.service';

@Component({
  selector: 'app-view-item-category',
  templateUrl: './view-item-category.component.html',
  styleUrl: './view-item-category.component.scss'
})
export class ViewItemCategoryComponent {
  @Input() parentAddedId: number;
  @Input() account: AddItemCategory;
  checked: boolean = true;
  yes: boolean = false;
  Active: boolean = false;
  Inactive: boolean = false;
  Period: boolean = false;
  Mandatory: boolean = false;
  AccountsDropDownLookup : { id: number; name: string}[] = []

  Optional: boolean = false;
  NotAllow: boolean = false;
  accountLevel?: string;
  accountTags?: string;
  accountCompanies?: string;
  parent?: AddItemCategory | any;
  
  constructor(private accountService: AccountService,
    private title: Title,
    private langService: LanguageService,
    private itemService : ItemsService
  ) {
    this.title.setTitle(this.langService.transalte('ChartOfAccount.ViewChartOfAccount'));

  }
  ngOnInit() {
    this.AccountsDropDown()
  }
  getAccountDetails(id: number) {
    this.itemService.getItemCategoryById(id);
    this.itemService.getItemCategoryByIdDataObs.subscribe((res) => {
      this.parent = res;
    
    });
  
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['account']) {

      // Your logic here
      this.parent = this.account;
      console.log(this.parent , "this.parent");

      // if (this.parent.hasNoChild === true) {
      //   this.yes = true;
      // } else {
      //   this.yes = false;
      // }
    }

    //   if (this.parent.accountActivation === 'Active') {
    //     this.Active = true;
    //     this.Inactive = false;
    //     this.Period = false;
    //   } else if (this.parent.accountActivation === 'Inactive') {
    //     this.Inactive = true;
    //     this.Active = false;
    //     this.Period = false;
    //   } else if (this.parent.accountActivation === 'PeriodicActive') {
    //     this.Period = true;
    //     this.Inactive = false;
    //     this.Active = false;
    //   }

    //   if (this.parent.costCenterConfig === 'Mandatory') {
    //     console.log("MandatoryMandatoryMandatory");
        
    //     this.Mandatory = true;
    //     this.NotAllow = false;
    //     this.Optional = false;
    //   } else if (this.parent.costCenterConfig === 'NotAllow') {
    //     this.NotAllow = true;
    //     this.Mandatory = false;
    //     this.Optional = false;
    //   } else if (this.parent.costCenterConfig === 'Optional') {
    //     this.Optional = true;
    //     this.Inactive = false;
    //     this.Mandatory = false;
    //   }
    //   this.accountLevel = this.parent?.accountLevel?.toString();
    //   this.accountTags = this.parent?.accountTags?.join('  ');
    //   this.accountCompanies = this.parent?.accountCompanies?.join('  ');
    //   //console.log('Account changed:', changes['account'].currentValue);
    // }
  }
  AccountsDropDown() {
    this.itemService.AccountsDropDown()
    this.itemService.AccountsDropDownLookupObs.subscribe(res=>{
      this.AccountsDropDownLookup = res
    })
  }
}
