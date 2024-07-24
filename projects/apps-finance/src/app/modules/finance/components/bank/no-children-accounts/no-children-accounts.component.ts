import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SearchFunc } from 'libs/shared-lib/src/lib/models/sendQueries';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { AccountDto } from 'projects/apps-accounting/src/app/modules/account/models';
import { debounceTime } from 'rxjs';
import { PageInfo, PageInfoResult } from 'shared-lib';

@Component({
  selector: 'app-no-children-accounts',
  templateUrl: './no-children-accounts.component.html',
  styleUrl: './no-children-accounts.component.scss'
})
export class NoChildrenAccountsComponent implements OnInit {
  pageInfo = new PageInfo();
  items: AccountDto[];
  paging: PageInfoResult;
  searchTerm: string = '';
  lang: string;
  selectedIndex: number = -1;
  selectedAccount: AccountDto | null;
  searchForm: FormGroup = this.fb.group({
    SearchTerm: [''],
  });

  @Input() hasNoChildren: boolean = true;

  constructor(
    private accountService: AccountService,
    private translate: TranslateService,
    private ref: DynamicDialogRef,
    private fb: FormBuilder
  ) {
    this.lang = (translate.currentLang || 'EN').toLowerCase();
  }

  ngOnInit(): void {
    this.getAccounts(this.searchForm.get('SearchTerm')?.value);

    this.searchForm.valueChanges.pipe(debounceTime(1000)).subscribe((res) => {
      //console.log(res);
      this.getAccounts(SearchFunc(this.searchForm.value));
    });
  }

  getAccounts(searchTerm: string) {
    this.accountService.getAccountsHasNoChildren(searchTerm, this.pageInfo).subscribe((r) => {
      //console.log('account List', r.result);

      this.items = r.result;
      this.paging = r.pageInfoResult;
    });
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
