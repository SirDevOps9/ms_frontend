import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../account/account.service';
import { PageInfo, PageInfoResult } from 'shared-lib';
import { AccountDto } from '../../../account/models/accountDto';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { SearchFunc } from 'libs/shared-lib/src/lib/models/sendQueries';


@Component({
  selector: 'app-multi-select-detailed-accounts',
  templateUrl: './multi-select-detailed-accounts.component.html',
  styleUrls: ['./multi-select-detailed-accounts.component.scss']
})
export class MultiSelectDetailedAccountsComponent  implements OnInit {
  pageInfo = new PageInfo();
  items: AccountDto[] = [];
  paging: PageInfoResult;
  searchTerm: string = '';
  selectedIndices: number[] = [];  
  selectedAccounts: AccountDto[] = []; 
  searchForm: FormGroup = this.fb.group({
    SearchTerm: [''],
  });

  constructor(
    private accountService: AccountService,
    private ref: DynamicDialogRef,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAccounts(this.searchForm.get('SearchTerm')?.value);

    this.searchForm.valueChanges.pipe(debounceTime(1000)).subscribe((res) => {
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

  selectRow(event: any, account: AccountDto) {
    const isSelected = this.isAccountSelected(account);
    if (isSelected) {
      this.selectedAccounts = this.selectedAccounts.filter(acc => acc.id !== account.id);
      this.selectedIndices = this.selectedIndices.filter(index => this.items[index].id !== account.id);
    } else {
      this.selectedAccounts.push(account);
      this.selectedIndices.push(this.items.findIndex(i => i.id === account.id));
    }
  
  }
  
  isAccountSelected(account: AccountDto): boolean {
    return this.selectedAccounts.some(acc => acc.id === account.id);
  }

  onSubmit() {

    this.ref.close(this.selectedAccounts);
  }

  onCancel() {
    this.ref.close();
  }
}