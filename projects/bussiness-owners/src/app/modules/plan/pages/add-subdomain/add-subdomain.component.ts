// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
// import { FormsService, customValidators } from 'shared-lib';


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  FormsService,
  LookupEnum,
  LookupsService,
  customValidators,
  lookupDto,
} from 'shared-lib';


@Component({
  selector: 'app-add-subdomain',
  templateUrl: './add-subdomain.component.html',
  styleUrls: ['./add-subdomain.component.css']
})
export class AddSubdomainComponent implements OnInit {

  constructor(    
    public dialogService: DialogService,
    private fb: FormBuilder,
    private formService: FormsService,
    private ref: DynamicDialogRef,
   ) { }

  ngOnInit() {
  }
 subdomainForm: FormGroup;


  onSubmit() {

  }
  onCancel() {
    this.ref.close();
  }

  initializeUserForm() {
    this.subdomainForm = this.fb.group({
      subdomain: ['', [customValidators.required, ]],
    });
  }

}
