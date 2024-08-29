import { Component } from '@angular/core';
import { AccountDto } from '../../../models';
import { PageInfo, PageInfoResult } from 'shared-lib';
import { SearchFunc } from 'libs/shared-lib/src/lib/models/sendQueries';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-popup-accounts',
  templateUrl: './popup-accounts.component.html',
  styleUrl: './popup-accounts.component.scss'
})
export class PopupAccountsComponent {
  pageInfo = new PageInfo();
  items: AccountDto[];
  shouldShowPaginatorBefore = true;
  paging: PageInfoResult;
  searchTerm: string = '';
  selectedIndex: number = -1;
  selectedAccount: AccountDto | null;
  searchForm: FormGroup = this.fb.group({
    SearchTerm: [''],
  });

  constructor(
    private accountService: AccountService,
    private ref: DynamicDialogRef,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.getAccounts(this.searchForm.get('SearchTerm')?.value);

    this.searchForm.valueChanges.pipe(debounceTime(1000)).subscribe((res) => {
      //console.log(res);
      this.getAccounts(SearchFunc(this.searchForm.value));
    });

    this.accountService.childrenAccountList.subscribe((res) => {
      this.items = res;
    });

    this.accountService.childrenAccountPageInfo.subscribe((res) => {
      this.paging = res;
    });
  }

  getAccounts(searchTerm: string) {
    this.accountService.getAccountChildrenList(searchTerm, this.pageInfo);
  }

  onPageChange(pageInfo: PageInfo) {
    this.pageInfo = pageInfo;
    this.getAccounts(SearchFunc(this.searchForm.value));
  }

  onSearch() {
    this.pageInfo = new PageInfo();
    this.getAccounts(SearchFunc(this.searchForm.value));
  }

  selectRow(event: any, account: AccountDto) {
    // if (event.target.checked) {
    this.selectedAccount = account;
    this.selectedIndex = this.items.findIndex((i) => i.id == account.id);
    // } else {
    //   this.selectedAccount = null;
    //   this.selectedIndex = -1;
    // }

    setTimeout(() => {
      this.onSubmit();
    }, 100);
  }

  onSubmit() {
    this.ref.close(this.selectedAccount);
  }

  onCancel() {
    this.ref.close();
  }
}


