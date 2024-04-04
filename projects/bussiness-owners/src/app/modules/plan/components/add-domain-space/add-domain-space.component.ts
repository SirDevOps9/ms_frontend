import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsService, RouterService, customValidators } from 'shared-lib';
import { DomainSpaceDto } from '../../models/domainspacedto';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PlanService } from '../../plan.service';

@Component({
  selector: 'app-add-domain-space',
  templateUrl: './add-domain-space.component.html',
  styleUrls: ['./add-domain-space.component.scss']
})
export class AddDomainSpaceComponent implements OnInit {
  subdomainForm: FormGroup;

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
    const domainModel: DomainSpaceDto = this.subdomainForm.value;
    domainModel.id = ""
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
