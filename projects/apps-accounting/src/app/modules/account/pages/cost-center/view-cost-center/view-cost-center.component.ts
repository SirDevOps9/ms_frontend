import { Component, Input, OnInit, output, SimpleChanges } from '@angular/core';
import { AccountService } from '../../../account.service';
import {  costCenterDetails } from '../../../models';
import { LanguageService } from 'shared-lib';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-view-cost-center',
  templateUrl: './view-cost-center.component.html',
  styleUrl: './view-cost-center.component.scss'
})
export class ViewCostCenterComponent implements OnInit {
  @Input() parentViewdId:any;
  costView?:costCenterDetails
  sendId = output<number>();

  constructor(
    private accountService: AccountService,
    private title: Title,
    private langService: LanguageService
  ){
    this.title.setTitle(this.langService.transalte('costCenter.ViewCostCenter'));

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
  routeToEdit(){
    this.sendId.emit(this.parentViewdId as number) 
    

  }
}
