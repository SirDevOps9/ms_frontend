import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FormsService, customValidators,LanguageService ,ToasterService } from 'shared-lib';
import { AccountService } from '../../../account.service';
import { costById, parentCostCenter } from '../../../models';

@Component({
  selector: 'app-edit-cost-center',
  templateUrl: './edit-cost-center.component.html',
  styleUrl: './edit-cost-center.component.scss'
})
export class EditCostCenterComponent implements OnInit {
  formGroup: FormGroup;
  code:string
  parentAccounts: parentCostCenter[] = [];
  editParentId:number

  @Input() parentEditedId?: number ;
  @Output() operationCompleted = new EventEmitter<any>();
constructor(
  private formBuilder: FormBuilder,
  private formsService: FormsService,
  private accountService: AccountService,
  private toaserService: ToasterService,

  private languageService: LanguageService,


){
  this.formGroup = this.formBuilder.group({
    id:new FormControl(''),
    name: new FormControl('',customValidators.required),
    parentId: new FormControl(null),
    isDetail: new FormControl(false),

    
  });
}
  ngOnInit() {
    this.GetAllParentsCostCenters()
    this.accountService.costparentAccounts.subscribe((res) => {
      if (res) {
        this.parentAccounts = res;

      }
    });
    this.getCostById(this.parentEditedId)
   
  }
  test(){
    if (!this.formsService.validForm(this.formGroup, false)) return;

    console.log(this.formGroup.value);
    
  }
  
  onSubmit() {

    if (!this.formsService.validForm(this.formGroup, false)) return;


    let obj: costById = this.formGroup.value;

    this.accountService.editCost(obj);

    this.accountService.editedCost.subscribe((res) => {
      if (res) {
        this.operationCompleted.emit(this.parentEditedId);
        this.toaserService.showSuccess(
          this.languageService.transalte('ChartOfAccounts.SuccessTitle'),
          this.languageService.transalte('ChartOfAccounts.SuccessMessage')
        );
      }
    });
  }
  getCostById(id: any) {
    this.accountService.getcostById(id);
    this.accountService.selectedCostById.subscribe((res:any) => {
      this.code =res.code
      if(res.parentId){
        this.editParentId=res.parentId
        this.formGroup.get('parentId')?.setValue(res.parentId)

      }
      const newAccountData = {
        id:res.id,
        name:res.name,
        parentId:res.parentId,
        isDetail:res.isDetail,
      };
      this.formGroup.patchValue(newAccountData);
    });
  }
  GetAllParentsCostCenters(){
    this.accountService.GetAllParentsCostCenters();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parentEditedId']) {
      this.getCostById(this.parentEditedId);
    }
  }
}