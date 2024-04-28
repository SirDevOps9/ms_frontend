import { Component, OnInit } from '@angular/core';
import { PageInfo, PageInfoResult } from 'shared-lib';

@Component({
  selector: 'app-journal-entry-list',
  templateUrl: './journal-entry-list.component.html',
  styleUrl: './journal-entry-list.component.scss'
})
export class JournalEntryListComponent implements OnInit {
  userData:any
  currentPageInfo: PageInfoResult;
ngOnInit(): void {
  this.userData=[
    {
      Id:11111111,
      JournalCode:111,
      RefrenceNumber :111,
      CreatedOn :111,
      Type :111,
      SourceName :111,
      SourceCode :111,
      IsRepeated :111,
      IsReversed :111,
      Status :111,
      TotalDebitAmount :100,
      TotalCreditAmount :100
   

    },
 
   

  ]
}
onPageChange(pageInfo: PageInfo) {
  console.log(pageInfo); 
}
}
