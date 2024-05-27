import { Component, OnInit } from '@angular/core';
import { PageInfo, RouterService } from 'shared-lib';
import { JournalEntryService } from '../../../journal-entry.service';
import { JournalEntryViewDto } from '../../../models';

@Component({
  selector: 'app-view-journal-entry',
  templateUrl: './view-journal-entry.component.html',
  styleUrl: './view-journal-entry.component.scss',
  providers: [RouterService],
})
export class ViewJournalEntryComponent implements OnInit {
  currentPageInfo: PageInfo = new PageInfo();
  data : any= {}
  journalView?:JournalEntryViewDto ;




  ngOnInit() {
    this.loadJournalView();
  }




  onPageChange(pageInfo: PageInfo) {
    console.log(pageInfo);
  }

  
  loadJournalView() {
    const employeeId = this.routerService.currentId;
    this.journalEntryService.getJournalEntryViewById(employeeId).subscribe((res) => {
      this.journalView = res;
    });
  }
  
  constructor(
    private journalEntryService:JournalEntryService,
    private routerService: RouterService,

   ) { }

}

