import { Component, OnInit } from '@angular/core';
import { LanguageService, PageInfo, RouterService } from 'shared-lib';
import { JournalEntryService } from '../../../journal-entry.service';
import { JournalEntryViewDto } from '../../../models';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view-journal-entry',
  templateUrl: './view-journal-entry.component.html',
  styleUrl: './view-journal-entry.component.scss',
  providers: [RouterService],
})
export class ViewJournalEntryComponent implements OnInit {
  currentPageInfo: PageInfo = new PageInfo();
  data: any = {};
  journalView?: JournalEntryViewDto;

  ngOnInit() {
    this.titleService.setTitle('View Journal');

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
    private journalEntryService: JournalEntryService,
    private routerService: RouterService,
    private langService: LanguageService,
    private titleService: Title
  ) {}
}
