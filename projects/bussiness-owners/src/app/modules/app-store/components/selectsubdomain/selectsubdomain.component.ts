import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedLibModule, customValidators, lookupDto } from 'shared-lib';

@Component({
  selector: 'app-selectsubdomain',
  templateUrl: './selectsubdomain.component.html',
  styleUrls: ['./selectsubdomain.component.scss'],
  standalone: true,
  imports: [SharedLibModule, CommonModule],
})
export class SelectSubdomainComponent implements OnInit {
  selectSubdomain: FormGroup;

  selectedSubdomain: any;
  allSubdomains: lookupDto[];
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private formBuilder: FormBuilder
  ) {}
  private initializeForm() {
    this.selectSubdomain = this.formBuilder.group({
      subdomain: new FormControl('', [customValidators.required]),
    });
  }
  ngOnInit(): void {
    this.initializeForm();
    this.allSubdomains = this.config.data.subdomains;
  }
  onCancel() {
    this.ref.close();
  }

  submit() {
    this.ref.close(this.selectSubdomain.value.subdomain);
  }
}
