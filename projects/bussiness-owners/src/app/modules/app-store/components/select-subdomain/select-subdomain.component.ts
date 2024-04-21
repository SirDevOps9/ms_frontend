import { Component, OnInit } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { BaseDto ,customValidators } from "shared-lib";
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select-subdomain',
  templateUrl: './select-subdomain.component.html',
  styleUrl: './select-subdomain.component.scss'
})
export class SelectSubdomainComponent implements OnInit {
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
