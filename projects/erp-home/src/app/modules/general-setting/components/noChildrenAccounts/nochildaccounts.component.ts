import { Component, OnInit } from '@angular/core';
import { PageInfo, PageInfoResult } from 'shared-lib';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { SearchFunc } from 'libs/shared-lib/src/lib/models/sendQueries';
import { GeneralService } from 'libs/shared-lib/src/lib/services/general.service';
import { AccountDto } from '../../models';
import { GeneralSettingService } from '../../general-setting.service';

@Component({
  selector: 'app-nochildaccounts',
  templateUrl: './nochildaccounts.component.html',
  styleUrl: './nochildaccounts.component.scss',
})
export class NoChildrenAccountsComponent implements OnInit {
  pageInfo = new PageInfo();
  items: AccountDto[];
  paging: PageInfoResult;
  searchTerm: string = '';
  selectedIndex: number = -1;
  selectedAccount: AccountDto | null;
  searchForm: FormGroup = this.fb.group({
    SearchTerm: [''],
  });

  constructor(
    private generalService: GeneralSettingService,
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

    this.generalService.childrenAccountList.subscribe((res) => {
      this.items = res;
    });

    this.generalService.childrenAccountPageInfo.subscribe((res) => {
      this.paging = res;
    });
  }

  getAccounts(searchTerm: string) {
    this.generalService.getAccountChildrenList(searchTerm, this.pageInfo);
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
