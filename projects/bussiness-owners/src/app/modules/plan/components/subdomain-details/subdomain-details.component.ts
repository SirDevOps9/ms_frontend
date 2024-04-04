import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PlanService } from '../../plan.service';

@Component({
  selector: 'app-subdomain-details',
  templateUrl: './subdomain-details.component.html',
  styleUrls: ['./subdomain-details.component.css']
})
export class SubdomainDetailsComponent implements OnInit {
subdomainform:any;

  ngOnInit() {
    this.initializeSubdomainData();
  }
  initializeSubdomainData() {
    this.planService.loadSubdomainDetails(parseInt(this.SupdomainId));
    this.planService.subdomainDetails.subscribe((subdomainform) => {
      this.subdomainform = subdomainform;
    });
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
    ) { }
}
