import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedLibModule, customValidators, lookupDto } from 'shared-lib';
import { AppStoreService } from '../../app-store.service';

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
  appId: number;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private appStoreService: AppStoreService
  ) {}
  private initializeForm() {
    this.selectSubdomain = this.formBuilder.group({
      subdomain: new FormControl('', [customValidators.required]),
    });
  }
  ngOnInit(): void {
    this.initializeForm();
    this.allSubdomains = this.config.data.subdomains;
    this.appId = this.config.data.appId;
  }
  onCancel() {
    this.ref.close();
  }

  submit() {
    this.appStoreService.addModelToCart(
      {
        subdomainId: this.selectSubdomain.value.subdomain,
        appId: this.appId,
      },
      this.ref,
      this.selectSubdomain
    );
    // this.ref.close;
  }
}
