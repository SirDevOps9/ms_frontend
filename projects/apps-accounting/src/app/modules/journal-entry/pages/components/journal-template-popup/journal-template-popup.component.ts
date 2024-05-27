import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { JournalEntryService } from '../../../journal-entry.service';
import { LookupEnum, LookupsService, PageInfo, lookupDto } from 'shared-lib';
import { GetAllJournalTemplateDto ,JournalTemplateType} from '../../../models';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-journal-template-popup',
  templateUrl: './journal-template-popup.component.html',
  styleUrls: ['./journal-template-popup.component.scss']
})

export class JournalTemplatePopupComponent implements OnInit {
  currentPageInfo: PageInfo = new PageInfo();
  tableData: GetAllJournalTemplateDto[];
  typeOptions:JournalTemplateType;



  ngOnInit() {

    this.getAllJournalTemplate(this.currentPageInfo);

  }

  getAllJournalTemplate(page:PageInfo){
    this.journalEntryService.getAllJournalTemplatesPaginated(page).subscribe({
      next: (journalTemplateList: any) => {
        this.tableData = journalTemplateList.result;
        console.log("table",this.tableData);

      },
    });
  }

  onPageChange(pageInfo: PageInfo) {
    console.log(pageInfo);
    this.getAllJournalTemplate(pageInfo)
  }

  RoutToAddJournal(id: any) {
    this.ref .close(id);
    }

  
  constructor(
    private journalEntryService:JournalEntryService,
    private ref: DynamicDialogRef,
    private lookupsService: LookupsService,) { }

}
