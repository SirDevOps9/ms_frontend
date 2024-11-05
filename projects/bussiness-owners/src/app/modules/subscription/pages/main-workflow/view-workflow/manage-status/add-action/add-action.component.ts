import { Component, Input, OnInit, output } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ItemsService } from 'projects/apps-inventory/src/app/modules/items/items.service';
import { FormsService, PageInfo, customValidators } from 'shared-lib';
import { SubscriptionService } from '../../../../../subscription.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.component.html',
  styleUrl: './add-action.component.scss',
})
export class AddActionComponent implements OnInit {
  attrTableForm: FormArray;
  @Input() stateId: number;
  showList = output<boolean>();
  statusDropdown: { id: number; name: string }[] = [];
  constructor(
    private fb: FormBuilder,
    private formService: FormsService,
    private _subscriptionService: SubscriptionService,
    private _route: ActivatedRoute
  ) {
    const id = Number(this._route.snapshot.paramMap.get('id'));
    this.stateIdDropdown(id);
  }

  stateIdDropdown(id: number) {
    this._subscriptionService.getStatusDropDown(id, '', new PageInfo());

    this._subscriptionService.statusDropDownList$.subscribe({
      next: (res) => {
        this.statusDropdown = res;
      },
    });
  }

  ngOnInit(): void {
    this.attrTableForm = this.fb.array([this.create_Attr_FormGroup()]);
  }

  public get items(): FormArray {
    return this.attrTableForm as FormArray;
  }

  create_Attr_FormGroup(attrData?: any): FormGroup {
    return this.fb.group({
      name: new FormControl(attrData?.name || '', customValidators.required),
      toStateId: new FormControl(attrData?.toStateId || '', customValidators.required),
      conditionExpression: new FormControl(),
      toStateIdName: [],
    });
  }

  addLine() {
    if (!this.formService.validForm(this.attrTableForm)) return;
    this.items.push(this.create_Attr_FormGroup());
  }

  deleteLine(index: number): void {
    if (index >= 0 && index < this.attrTableForm.length) {
      this.attrTableForm.removeAt(index);
    }
  }


  displayState(event: any, formGroup: FormGroup) {
    const selectedOption = this.statusDropdown.find((option) => option.id === event);
    if (selectedOption) {
      formGroup.controls['toStateId'].setValue(selectedOption.id); // Set the ID
      formGroup.controls['toStateIdName'].setValue(selectedOption.name); // Set the name
    }
  }

  onSave(obj: any) {
    if (!this.formService.validForm(this.attrTableForm)) return;
    delete obj.toStateIdName;
    this._subscriptionService.addActions(this.stateId, obj);
    this._subscriptionService.addAction$.subscribe((res: any) => {
      console.log(res);
    });
  }

  backToActionList(event: boolean) {
    this.showList.emit(event);
  }
}
