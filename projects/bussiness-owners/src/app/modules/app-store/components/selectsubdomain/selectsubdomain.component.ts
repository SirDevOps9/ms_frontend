import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaseDto, SharedLibModule, customValidators } from 'shared-lib';

@Component({
  selector: 'app-selectsubdomain',
  templateUrl: './selectsubdomain.component.html',
  styleUrls: ['./selectsubdomain.component.scss'],
  standalone : true,
  imports : [SharedLibModule , CommonModule]
})
export class SelectsubdomainComponent implements OnInit {
  selectSubdomain: FormGroup;

  selectedSubdomain: any;
  allSubdomains: BaseDto[];
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,) {

  }
  private initializeForm() {
    this.selectSubdomain = this.formBuilder.group({
      subdomain: new FormControl('', [customValidators.required]),
    });
  }
  ngOnInit(): void {
    this.initializeForm();
      this.allSubdomains = this.config.data.subdomains;

  }

  submit() {
       this.ref.close(this.selectSubdomain.value.subdomain);
      console.log(this.selectSubdomain.value);
      
  }
}