import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DialogService } from 'primeng/dynamicdialog';
import { PageInfo, RouterService, LanguageService } from 'shared-lib';
import { JournalEntryService } from '../../../journal-entry.service';
import { GetGlOpeningBalanceById, JournalEntryViewDto } from '../../../models';
import { CostCenterAllocationPopupComponent } from '../../components/cost-center-allocation-popup/cost-center-allocation-popup.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-journal-entry-opening-balance',
  templateUrl: './view-journal-entry-opening-balance.component.html',
  styleUrl: './view-journal-entry-opening-balance.component.scss'
})
export class ViewJournalEntryOpeningBalanceComponent implements OnInit {
  currentPageInfo: PageInfo = new PageInfo();
  data: any = {};
  journalView?: GetGlOpeningBalanceById;
  ID : number
  ngOnInit() {
    this.ID = this.route.snapshot.params['id']

    this.loadJournalView();
  }

  onPageChange(pageInfo: PageInfo) {
    console.log(pageInfo);
  }

  loadJournalView() {
    const employeeId = this.ID
    this.journalEntryService.getJournalEntryOpeningBalanceById(employeeId).subscribe((res) => {
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
    private route : ActivatedRoute
  ) {
    this.titleService.setTitle(this.langService.transalte('OpeningBalance.ViewJournal')); 

  }
}
