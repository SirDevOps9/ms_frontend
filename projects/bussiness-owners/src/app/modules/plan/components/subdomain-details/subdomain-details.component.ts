import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PlanService } from '../../plan.service';
import { subdomainDetailsDto } from '../../models/subdomainDetailsDto';
import { LogService, customValidators } from 'shared-lib';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-subdomain-details',
  templateUrl: './subdomain-details.component.html',
  styleUrls: ['./subdomain-details.component.scss']
})
export class SubdomainDetailsComponent implements OnInit {
  subdomainform:any ;
  name :any;
  ngOnInit() {
    this.initializeSubdomainData();

  }


  initializeSubdomainData() {
    this.planService.loadSubdomainDetails(parseInt(this.SupdomainId)).subscribe((res) => {
    this.subdomainform = res;
   this.name = res.subdomain.name;
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
     ,private logService: LogService,
     private formBuilder: FormBuilder
    ) { }
}
