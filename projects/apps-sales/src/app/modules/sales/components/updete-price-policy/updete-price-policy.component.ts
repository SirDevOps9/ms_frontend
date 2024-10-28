import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-updete-price-policy',
  templateUrl: './updete-price-policy.component.html',
  styleUrl: './updete-price-policy.component.scss'
})
export class UpdetePricePolicyComponent {
  constructor(
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    ) {
    
  }
  ngOnInit() {

    console.log(this.config.data , "ccccccccccc");
    
  }
}
