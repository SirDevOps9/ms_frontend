import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormsService, PageInfo, customValidators } from 'shared-lib';
import { SubscriptionService } from '../../../../../subscription.service';

@Component({
  selector: 'app-edit-action',
  templateUrl: './edit-action.component.html',
  styleUrl: './edit-action.component.scss',
})
export class EditActionComponent implements OnInit {
  attrTableForm: FormArray;
  @Input() stateId: number;
  @Input() existingData: any[] = []; // Data for multiple records, if needed
  @Output() showList = new EventEmitter<boolean>();
  statusDropdown: { id: number; name: string }[] = [];
  @Input() objToEdit: any; // Object to patch in the form array

  constructor(
    private fb: FormBuilder,
    private formService: FormsService,
    private _subscriptionService: SubscriptionService,
    private _route: ActivatedRoute
  ) {
    const id = Number(this._route.snapshot.paramMap.get('id'));
    this.stateIdDropdown(id);
  }

  ngOnInit(): void {
    this.attrTableForm = this.fb.array([]);

    if (this.stateId) {
      this.getWorkFlowStatesActionsByID(this.stateId);
    }
    // Patch objToEdit if provided
    if (this.objToEdit) {
      this.patchValues(this.objToEdit);
    }
  }

  public get items(): FormArray {
    return this.attrTableForm as FormArray;
  }

  createAttrFormGroup(attrData?: any): FormGroup {
    return this.fb.group({
      id: new FormControl(attrData?.id),
      name: new FormControl(attrData?.name || '', customValidators.required),
      toStateId: new FormControl(attrData?.toStateId || '', customValidators.required),
      conditionExpression: new FormControl(attrData?.conditionExpression || ''),
      toStateIdName: new FormControl(attrData?.toStateName || ''),
    });
  }

  addLine() {
    if (!this.formService.validForm(this.attrTableForm)) return;
    this.items.push(this.createAttrFormGroup());
  }

  deleteLine(index: number): void {
    if (index >= 0 && index < this.attrTableForm.length) {
      this.attrTableForm.removeAt(index);
    }
  }

  // Patch a single object into the form array
  patchValues(data: any) {
    const formGroup = this.createAttrFormGroup(data);
    this.items.push(formGroup);
  }

  displayState(event: any, formGroup: FormGroup) {
    const selectedOption = this.statusDropdown.find((option) => option.id === event);
    if (selectedOption) {
      formGroup.controls['toStateId'].setValue(selectedOption.id);
      formGroup.controls['toStateIdName'].setValue(selectedOption.name);
    }
  }

  onSave(obj: any) {

    
    if (!this.formService.validForm(this.attrTableForm)) return;
    delete obj[0].toStateIdName;
    this._subscriptionService.editActions(obj[0]);
    this._subscriptionService.updateAction$.subscribe((res: any) => {
      console.log(res);
    });
  }

  backToActionList(event: boolean) {
    this.showList.emit(event);
  }

  stateIdDropdown(id: number) {
    this._subscriptionService.getStatusDropDown(id, '', new PageInfo());

    this._subscriptionService.statusDropDownList$.subscribe({
      next: (res) => {
        this.statusDropdown = res;
      },
    });
  }

  getWorkFlowStatesActionsByID(id: number) {
    this._subscriptionService.getWorkFlowStatesActionsByID(id);
    this._subscriptionService.workFlowStatesActions$.subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  discard(){
    this.showList.emit(false);

  }
}
