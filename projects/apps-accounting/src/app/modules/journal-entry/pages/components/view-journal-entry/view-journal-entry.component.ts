import { Component, OnInit } from '@angular/core';
import { PageInfo } from 'shared-lib';
import { GetAllJournalTemplateDto } from '../../../models/journaltemplatedto';
import { JournalEntryService } from '../../../journal-entry.service';

@Component({
  selector: 'app-view-journal-entry',
  templateUrl: './view-journal-entry.component.html',
  styleUrl: './view-journal-entry.component.scss'
})
export class ViewJournalEntryComponent implements OnInit {
  currentPageInfo: PageInfo = new PageInfo();
  tableData: GetAllJournalTemplateDto[];
  data : any= {}
  ngOnInit() {
    this.getAllJournalTemplate(this.currentPageInfo);
  }

  getAllJournalTemplate(page:PageInfo){
    this.journalEntryService.getAllJournalTemplatesPaginated(page).subscribe({
      next: (journalTemplateList: any) => {
        this.tableData = journalTemplateList.result;
      },
    });
  }

  onPageChange(pageInfo: PageInfo) {
    console.log(pageInfo);
    this.getAllJournalTemplate(pageInfo)
  }

  

  
  constructor(
    private journalEntryService:JournalEntryService,
   ) { }

}

