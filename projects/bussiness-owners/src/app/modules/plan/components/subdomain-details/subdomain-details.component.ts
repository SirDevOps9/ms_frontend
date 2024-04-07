import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PlanService } from '../../plan.service';
import { subdomainDetailsDto } from '../../models/subdomainDetailsDto';
import { LogService } from 'shared-lib';

@Component({
  selector: 'app-subdomain-details',
  templateUrl: './subdomain-details.component.html',
  styleUrls: ['./subdomain-details.component.css']
})
export class SubdomainDetailsComponent implements OnInit {
 subdomainform:any = {};

  ngOnInit() {
    this.initializeSubdomainData();
    
    this.logService.log("onInitializeSub");
    this.logService.log(this.subdomainform);
  }

  initializeSubdomainData() {
    this.planService.loadSubdomainDetails(parseInt(this.SupdomainId));
    this.planService.subdomainDetails.subscribe((res) => {
      this.subdomainform = res;
    });
    this.logService.log("sandra");
      this.logService.log(this.subdomainform);
  }

  get SupdomainId(): string {
    return this.config.data.Id;
  }

  onCancel() {
    this.ref.close();
  }
  constructor( private ref: DynamicDialogRef
     ,public config: DynamicDialogConfig
     ,private planService: PlanService
     ,private logService: LogService
    ) { }
}
