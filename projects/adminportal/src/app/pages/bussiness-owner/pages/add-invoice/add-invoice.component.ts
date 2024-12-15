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
  BusinessOwner:any;
  ngOnInit(): void {
    this.initializeForm();
    this.getBusinessOwnerLookup();
    this.getApps();
  }
  getApps(){
    this.bussinessOwnerService.getApps().subscribe((res:any)=>{
      this.apps = res      
      
    })
  }
  getBusinessOwnerLookup(){
    this.bussinessOwnerService.getBusinessOwnerLookup().subscribe((res:any)=>{
      this.BusinessOwner = res      
      
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
  setData(id:number){
    const x:any = this.BusinessOwner.find((element:any)=> element.id == id)
    this.addForm.get('email')?.setValue(x.email)
    this.addForm.get('phone')?.setValue(x.phone)
    
  }
  constructor(
    private formBuilder: FormBuilder,
    private bussinessOwnerService: BussinessOwnerService,
 ){}
}
