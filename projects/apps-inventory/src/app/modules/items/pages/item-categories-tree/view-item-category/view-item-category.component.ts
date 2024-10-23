import { Component, Input, output, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { LanguageService } from 'shared-lib';
import { AddItemCategory } from '../../../models';
import { ItemsService } from '../../../items.service';

@Component({
  selector: 'app-view-item-category',
  templateUrl: './view-item-category.component.html',
  styleUrl: './view-item-category.component.scss',
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
  AccountsDropDownLookup: { id: number; name: string }[] = [];

  Optional: boolean = false;
  NotAllow: boolean = false;
  accountLevel?: string;
  accountTags?: string;
  accountCompanies?: string;
  parent?: AddItemCategory | any;

  sendId = output<number>();

  constructor(
    private accountService: AccountService,
    private title: Title,
    private langService: LanguageService,
    private itemService: ItemsService
  ) {
    this.title.setTitle(this.langService.transalte('ChartOfAccount.ViewChartOfAccount'));
  }
  ngOnInit() {
    this.AccountsDropDown();
  }
  getAccountDetails(id: number) {
    this.itemService.getItemCategoryById(id);
    this.itemService.getItemCategoryByIdDataObs.subscribe((res) => {
      this.parent = res;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['account']) {
      this.parent = this.account;
    }
  }
  AccountsDropDown() {
    this.itemService.AccountsDropDown();
    this.itemService.AccountsDropDownLookupObs.subscribe((res) => {
      this.AccountsDropDownLookup = res;
    });
  }
  routeToEdit() {
    this.sendId.emit(this.account?.id as number);
  }
}
