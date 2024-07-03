import { Component, OnInit } from '@angular/core';
import { LanguageService, PageInfo, RouterService } from 'shared-lib';
import { JournalEntryService } from '../../../journal-entry.service';
import { JournalEntryViewDto } from '../../../models';
import { Title } from '@angular/platform-browser';
import { DialogService } from 'primeng/dynamicdialog';
import { CostCenterAllocationPopupComponent } from '../cost-center-allocation-popup/cost-center-allocation-popup.component';

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

  openCostPopup(data : any , text : string) {
    if(!data.creditAmount && !data.debitAmount){
      return null
    }else {
      const dialogRef =  this.dialog.open(CostCenterAllocationPopupComponent,{
        width: '900px',
        height: '500px',
        header : 'View Cost Center Allocation',
        data : {...data , text}
      });
      dialogRef.onClose.subscribe((res) => {
        if(res)data.costCenters = res
       
      });
    }
    
  }

  constructor(
    private journalEntryService: JournalEntryService,
    private routerService: RouterService,
    private langService: LanguageService,
    private titleService: Title,
    private dialog: DialogService,
  ) {}
}
