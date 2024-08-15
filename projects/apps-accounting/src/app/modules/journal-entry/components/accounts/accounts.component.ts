import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../../../account/account.service';
import { FilterDto, FilterOptions, PageInfo, PageInfoResult } from 'shared-lib';
import { AccountDto } from '../../../account/models/accountDto';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { SearchFunc } from 'libs/shared-lib/src/lib/models/sendQueries';

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
  searchForm : FormGroup = this.fb.group({
    SearchTerm : ['']
  });

  @Input() hasNoChildren :boolean = true;

  constructor(private accountService: AccountService,
    private translate: TranslateService,
    private ref: DynamicDialogRef,
    private fb : FormBuilder

  ) {
    this.lang = (translate.currentLang || 'EN').toLowerCase();
  }

  ngOnInit(): void {
    this.getAccounts(this.searchForm.get('SearchTerm')?.value);

    this.searchForm.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(res=>{
      console.log(res)
      this.getAccounts(SearchFunc(this.searchForm.value));

    })
  }

  getAccounts(searchTerm : string) {
    this.accountService.getAllChartOfAccountPaginated(searchTerm, this.pageInfo).subscribe(r => {
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
    if (event.target.checked) {
      this.selectedAccount = account;
      this.selectedIndex = this.items.findIndex(i => i.id == account.id);
    }
    else {
      this.selectedAccount = null;
      this.selectedIndex = -1;
    }

    setTimeout(() => {
      this.onSubmit()
    }, 100);
  }

  onSubmit() {
    this.ref.close(this.selectedAccount);
  }

  onCancel() {
    this.ref.close();
  }
}
