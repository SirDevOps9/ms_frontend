import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../account/account.service';
import { FilterDto, FilterOptions, PageInfo, PageInfoResult } from 'shared-lib';
import { AccountDto } from '../../../account/models/accountDto';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private accountService: AccountService, private translate: TranslateService) {
    this.lang = (translate.currentLang || 'EN').toLowerCase();
  }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts() {
    this.accountService.getAllPaginated(this.searchTerm, this.pageInfo).subscribe(r => {
      this.items = r.result;
      this.paging = r.pageInfoResult;
    });
  }

  onPageChange(pageInfo: PageInfo){
    this.pageInfo = pageInfo;
    this.getAccounts();
  }

  onSearch() {
    this.pageInfo = new PageInfo();
    this.getAccounts();
  }
}
