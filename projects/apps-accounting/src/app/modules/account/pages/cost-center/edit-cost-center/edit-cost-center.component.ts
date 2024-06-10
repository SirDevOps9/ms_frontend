import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FormsService, customValidators } from 'shared-lib';

@Component({
  selector: 'app-edit-cost-center',
  templateUrl: './edit-cost-center.component.html',
  styleUrl: './edit-cost-center.component.scss'
})
export class EditCostCenterComponent implements OnInit {
  formGroup: FormGroup;
constructor(
  private formBuilder: FormBuilder,
  private formsService: FormsService,

){
  this.formGroup = this.formBuilder.group({
   
    code: new FormControl(''),
    name: new FormControl('',customValidators.required),
    parentAccount: new FormControl('',customValidators.required),
    detail: new FormControl(''),

    
  });
}
  ngOnInit() {
   
    
   
  }
  test(){
    if (!this.formsService.validForm(this.formGroup, false)) return;

    console.log(this.formGroup.value);
    
  }

}
