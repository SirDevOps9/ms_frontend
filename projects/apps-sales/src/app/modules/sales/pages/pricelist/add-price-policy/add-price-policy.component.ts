import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { customValidators, FormsService } from 'shared-lib';

@Component({
  selector: 'app-add-price-policy',
  templateUrl: './add-price-policy.component.html',
  styleUrl: './add-price-policy.component.scss'
})
export class AddPricePolicyComponent implements OnInit {
 
  addForm: FormGroup;
  ngOnInit() {
    this.initializeForm()
  }
  initializeForm() {
    this.addForm = this.formBuilder.group({

      code: new FormControl(''),
      name: new FormControl('' ,[customValidators.required, customValidators.length(1,100)]),
      uploadPolicy: new FormControl(''),
      fromPolicy: new FormControl(''),
      item: new FormControl(''),
      itemCategory: new FormControl(''),
      value: new FormControl(''),
      valueType: new FormControl(''),
      VAT: new FormControl(''),
      applyDate: new FormControl(''),
      date: new FormControl(''),
      valueSelect:new FormControl(''),
      pricePolicyDetails: this.formBuilder.array([]),
  
    });

  }
  get pricePolicyFormArray() {
    return this.addForm.get('pricePolicyDetails') as FormArray;
  }
  addNewRow() {
    
    if (!this.formsService.validForm(this.pricePolicyFormArray, false) ) return;

  
  let newLine = this.formBuilder.group(
    {
      code: new FormControl('',[customValidators.required]),
      name: new FormControl(''),
      uom: new FormControl(''),
      varient: new FormControl(''),
      price: new FormControl('',[customValidators.required]),
      VAT: new FormControl(''),
      priceVAT: new FormControl(''),
      id: new FormControl(0),
     
    }
  );
  newLine.updateValueAndValidity();
  this.pricePolicyFormArray.push(newLine);

}
  test(){

  }
  constructor(
    private formBuilder: FormBuilder,
    private formsService: FormsService,


  ){}
}
