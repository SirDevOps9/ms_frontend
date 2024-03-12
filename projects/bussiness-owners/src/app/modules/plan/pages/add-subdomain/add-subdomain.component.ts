import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,   } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsService, RouterService, customValidators } from 'shared-lib';
import { PlanService } from '../../plan.service';
import { AddSubdomainDto } from '../../models/addsubdomaindto';

@Component({
  selector: 'app-add-subdomain',
  templateUrl: './add-subdomain.component.html',
  styleUrls: ['./add-subdomain.component.css'],
})
export class AddSubdomainComponent implements OnInit {
  subdomainForm: FormGroup;
  get currentPlanId(): string {
    return this.config.data.Id;
  }
  ngOnInit() {
    this.initializesubDomainForm();
  }
  
  initializesubDomainForm() {
    this.subdomainForm = this.fb.group({
      subdomain: ['', [customValidators.required]],
    });
  }

  onSubmit() {
    if (!this.formService.validForm(this.subdomainForm, true)) return;
    const domainModel: AddSubdomainDto = this.subdomainForm.value;
    domainModel.id= this.currentPlanId;
    this.planService.addSubdomain(domainModel, this.ref);
  }


  onCancel() {
    this.ref.close();
  }


  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private fb: FormBuilder,
    private formService: FormsService,
    private ref: DynamicDialogRef,
    private planService: PlanService,
    private routerService: RouterService
  ) {}
}
