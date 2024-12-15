import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BussinessOwnerService } from '../../bussiness-owner.service';
import { customValidators } from 'shared-lib';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrl: './add-invoice.component.scss'
})
export class AddInvoiceComponent {
  addForm: FormGroup;
  apps:any;
  ngOnInit(): void {
    this.initializeForm()
  }
  getApps(){
    this.bussinessOwnerService.getApps().subscribe((res:any)=>{
      this.apps = res      
      
    })
  }
  initializeForm(){
    this.addForm = this.formBuilder.group({
      name:  new FormControl('' , [customValidators.required]),
      email:  new FormControl('', [customValidators.required , customValidators.email]),
      countryCode:  new FormControl('',[customValidators.required]),
      phone: new FormControl('',[customValidators.required]),
      phoneCode:  new FormControl('',[customValidators.required]),
    })

  }
  constructor(
    private formBuilder: FormBuilder,
    private bussinessOwnerService: BussinessOwnerService,
 ){}
}
