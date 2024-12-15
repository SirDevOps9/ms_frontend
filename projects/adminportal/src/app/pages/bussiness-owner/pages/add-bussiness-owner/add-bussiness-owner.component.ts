import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { customValidators, FormsService, RouterService } from 'shared-lib';
import { BussinessOwnerService } from '../../bussiness-owner.service';
import { CountriesDto } from '../../models';

@Component({
  selector: 'app-add-bussiness-owner',
  templateUrl: './add-bussiness-owner.component.html',
  styleUrl: './add-bussiness-owner.component.scss'
})
export class AddBussinessOwnerComponent implements OnInit {
  addForm: FormGroup;
  countries:CountriesDto[];
  currencies:any[];
  ngOnInit(): void {
    this.initializeForm()
    this.getCountriesLookup()
  }
  getCountriesLookup(){
    this.bussinessOwnerService.getCountriesLookup().subscribe((res:any)=>{

    this.countries = res.map((m:any)=> ({
      ...m,
      displayname:m.nameEn + ' ('+m.code +')'
      }))      
    })
  }
  getCurrenciesLookup(){
    this.bussinessOwnerService.getCurrenciesLookup().subscribe((res:any)=>{
      this.currencies = res      
      
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
  setData(phoneCode:string){
   const x:any = this.countries.find(element=> element.code == phoneCode)
  this.addForm.get('countryCode')?.setValue(x.code)
  

  }
  onCancel(){
    this.router.navigateTo('bussiness-owners');
  }
  onSave(){
    if (!this.formsService.validForm(this.addForm, false)) return;
    this.bussinessOwnerService.addBussinesOwner(this.addForm.value)
  }
 constructor(
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private router: RouterService,
    private bussinessOwnerService: BussinessOwnerService,
 ){}
}
