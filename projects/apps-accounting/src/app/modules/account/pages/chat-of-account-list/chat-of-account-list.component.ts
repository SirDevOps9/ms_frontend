import { Component, OnInit } from '@angular/core';
import { LanguageService, PageInfo, RouterService } from 'shared-lib';
import { JournalEntryService } from '../../../journal-entry/journal-entry.service';
import { AccountService } from '../../account.service';
import { AccountDto } from '../../models/accountDto';

@Component({
  selector: 'app-chat-of-account-list',
  templateUrl: './chat-of-account-list.component.html',
  styleUrls: ['./chat-of-account-list.component.css']
})
export class ChatOfAccountListComponent implements OnInit {
onPageChange($event: PageInfo) {
throw new Error('Method not implemented.');
}

  tableData: AccountDto[];
  currentPageInfo: PageInfo = new PageInfo();


  constructor(private routerService: RouterService,
    private languageService: LanguageService,
    private accountService: AccountService) { }

  ngOnInit() {
    this.initChartOfAccountData(this.currentPageInfo);
  }
  
  initChartOfAccountData(page:PageInfo) {

    this.accountService.getAllChartOfAccountPaginated(page).subscribe({
      next: (ChartOfAccountList: any) => {
        this.tableData = ChartOfAccountList.result;
        console.log('this.tableData', this.tableData);
      },
    });
  }
}
