import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AccountService } from '../../../account.service';
import {  costCenterDetails } from '../../../models';


@Component({
  selector: 'app-view-cost-center',
  templateUrl: './view-cost-center.component.html',
  styleUrl: './view-cost-center.component.scss'
})
export class ViewCostCenterComponent implements OnInit {
  @Input() parentViewdId:any;
  costView?:costCenterDetails

  constructor(
    private accountService: AccountService
  ){
  
  }
  ngOnInit() {
  }
  view(id:number){
    this.accountService.getCostDetails(id)
    this.accountService.selectedCostDetails.subscribe((res) => {
     this.costView=res
   });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parentViewdId']) {
      this.view(this.parentViewdId)
    }
  }
}
