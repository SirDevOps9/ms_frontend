import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LanguageService, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { JournalEntryService } from '../../journal-entry.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { JournalEntryDto } from '../../models';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-journal-entry-list',
  templateUrl: './journal-entry-list.component.html',
  styleUrl: './journal-entry-list.component.scss'
})
export class JournalEntryListComponent  implements OnInit {
  journalEntries: JournalEntryDto[];
  @ViewChild('myTab') myTab: any | undefined;
  selectedEntries: JournalEntryDto[];
  tableData: any ;
  cols: any[] = [];
  active: boolean = false;
  ref: DynamicDialogRef;
  currentPageInfo: PageInfo = new PageInfo();

  constructor(
    private routerService: RouterService,
    private titleService: Title,
    private languageService: LanguageService,
    private journalEntryService: JournalEntryService,
    private dialog: DialogService
  ) { }

  ngOnInit() {
    this.titleService.setTitle(
      this.languageService.transalte('JournalEntry.JournalEntryList')
    );
    this.initJournalEntryData();
    this.cols = [
      {
        field: 'Id',
        header: 'Id',
      },
      {
        field: 'Journal Code',
        header: 'JournalCode',
      },
      {
        field: 'Reference',
        header: 'RefrenceNumber',
      },
      {
        field: 'Date',
        header: 'CreatedOn',
      },
      {
        field: 'Type',
        header: 'Type',
      },
      {
        field: 'Document Name',
        header: 'SourceName',
      },
      {
        field: 'Document Code',
        header: 'SourceCode',
      },
      {
        field: 'Repeated',
        header: 'IsRepeated',
      },
      {
        field: 'Reversed',
        header: 'IsReversed',
      },
      {
        field: 'Status',
        header: 'Status',
      },
      {
        field: 'Debit',
        header: 'TotalDebitAmount',
      },
      {
        field: 'Credit',
        header: 'TotalCreditAmount',
      },
      {
        field: 'Returned',
        header: '',
      },
      {
        field: 'Actions',
        header: 'Actions',
      },
    ];
  }
  initJournalEntryData() {

     this.journalEntryService.getAllJournalEntriesPaginated(this.currentPageInfo).subscribe({
      next: (journalList : any) => {
        this.tableData = journalList.result;
        //this.tableData = this.convertToTreeNode(journalList);
        console.log('this.tableData', this.tableData);

      },
    });
  }
 
   
}
