import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormsService, LanguageService, ToasterService, customValidators } from 'shared-lib';
import { AccountService } from '../../../account.service';
import { addCostCenter, parentCostCenter } from '../../../models';

@Component({
  selector: 'app-add-cost-center',
  templateUrl: './add-cost-center.component.html',
  styleUrl: './add-cost-center.component.scss'
})
export class AddCostCenterComponent implements OnInit {
  formGroup: FormGroup;
  parentAccounts: parentCostCenter[] = [];
  @Input() newChiled?: boolean;

  @Input() parentAddedId?: number | undefined;
  @Output() operationCompleted = new EventEmitter<any>();

constructor(
  private formBuilder: FormBuilder,
  private formsService: FormsService,
  private accountService: AccountService,
  private toaserService: ToasterService,
  private languageService: LanguageService



){
  this.formGroup = this.formBuilder.group({
   
    name: new FormControl('',customValidators.required),
    parentId: new FormControl(null),
    isDetail: new FormControl(false),

    
  });
}
  ngOnInit() {
   if(this.parentAddedId){
    this.formGroup.get('parentId')?.setValue(this.parentAddedId)
   }
   this.GetAllParentsCostCenters()
    this.accountService.costparentAccounts.subscribe((res) => {
      if (res) {
        this.parentAccounts = res;

      }
    });

   
  }
  addChiled(){
    if (!this.formsService.validForm(this.formGroup, false)) return;

    let obj: addCostCenter = this.formGroup.value;

    this.accountService.AddCostCenter(obj);
 setTimeout(() => {
  this.accountService.savedAddedCost.subscribe((res) => {
    if (res) {
       this.operationCompleted.emit(res);
       console.log(res ,"tooooost");
       
       this.toaserService.showSuccess(
        this.languageService.transalte('ChartOfAccounts.SuccessTitle'),
        this.languageService.transalte('ChartOfAccounts.SuccessMessage')
      );
    }
  });
 }, 500);
  
    
  }
  GetAllParentsCostCenters(){
    this.accountService.GetAllParentsCostCenters();
  }
  ngOnChanges(changes: SimpleChanges): void {
 

    if (changes['newChiled']) {
      if (this.newChiled == true) {

        delete this.formGroup.value.accountCode
        this.formGroup.get('accountCode')?.setValue([null]);
      }
    }
  }
}

