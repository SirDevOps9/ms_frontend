import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../account/account.service';
import { FilterDto, FilterOptions, PageInfo, PageInfoResult } from 'shared-lib';
import { AccountDto } from '../../../account/models/accountDto';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent implements OnInit {

  pageInfo = new PageInfo();
  items: AccountDto[];
  paging: PageInfoResult;
  searchTerm: string = '';
  lang: string;
  selectedIndex: number = -1;
  selectedAccount: AccountDto | null;

  constructor(private accountService: AccountService,
    private translate: TranslateService,
    private ref: DynamicDialogRef,
  ) {
    this.lang = (translate.currentLang || 'EN').toLowerCase();
  }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts() {
    this.accountService.getAllChartOfAccountPaginated(this.searchTerm, this.pageInfo).subscribe(r => {
      this.items = r.result;
      this.paging = r.pageInfoResult;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.pageInfo = pageInfo;
    this.getAccounts();
  }

  onSearch() {
    this.pageInfo = new PageInfo();
    this.getAccounts();
  }

  selectRow(event: any, account: AccountDto) {
    if (event.target.checked) {
      this.selectedAccount = account;
      this.selectedIndex = this.items.findIndex(i => i.id == account.id);
    }
    else {
      this.selectedAccount = null;
      this.selectedIndex = -1;
    }
  }

  onSubmit() {
    this.ref.close(this.selectedAccount);
  }

  onCancel() {
    this.ref.close();
  }
}
