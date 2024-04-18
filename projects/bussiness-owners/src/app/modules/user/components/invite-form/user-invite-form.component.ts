import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { FormsService, customValidators } from 'shared-lib';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-user-invite-form',
  templateUrl: './user-invite-form.component.html',
  styleUrls: ['./user-invite-form.component.scss'],
})
export class UserInviteFormComponent implements OnInit {
  inviteForm: FormGroup;



  ngOnInit() {
    this.initializesubDomainForm();
  }

  initializesubDomainForm() {
    this.inviteForm = this.fb.group({
      loginEmail: new FormControl('', customValidators.required,),
      company: new FormControl('', customValidators.required,),
      branches: new FormControl('', customValidators.required,),
      domainSpace: new FormControl('', customValidators.required,),
      selectLicence: new FormControl('', customValidators.required,),

    });
  }


  onSubmit() {
    // if (!this.formService.validForm(this.subdomainForm, true)) return;
    // const domainModel: AddDomainSpaceDto = {
    //   ...this.subdomainForm.value,
    //   purchasingPaymentPeriod: this.purchasingPaymentPeriod,
    // };

    // this.subscriptionService.addSubdomain(domainModel, this.ref);
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
  ) {}
}
