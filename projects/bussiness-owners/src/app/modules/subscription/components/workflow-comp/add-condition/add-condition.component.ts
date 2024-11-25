import { Component, inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AndOr, FormsService, PageInfo, customValidators } from 'shared-lib';
import { SubscriptionService } from '../../../subscription.service';

@Component({
  selector: 'app-add-condition',
  templateUrl: './add-condition.component.html',
  styleUrl: './add-condition.component.scss',
})
export class AddConditionComponent implements OnInit {
  usersForm: FormArray;
  statusDropdown: { id: number; name: string }[] = [];
  config = inject(DynamicDialogConfig);

  constructor(
    private fb: FormBuilder,
    private formService: FormsService,
    private ref: DynamicDialogRef,
    private _subscriptionService: SubscriptionService
  ) {}
  get dataToPatch() {
    return this.config?.data;
  }

  ngOnInit(): void {
    this.usersForm = this.fb.array([this.create_Users_FormGroup()]);
    if (this.dataToPatch) {
      this.initValriabaleList(this.dataToPatch);
    }
    this.usersForm.at(0).get('andOr')?.disable();
  }

  public get items(): FormArray {
    return this.usersForm as FormArray;
  }

  create_Users_FormGroup(): FormGroup {
    return this.fb.group({
      andOr: new FormControl('', customValidators.required),
      variables: new FormControl('', customValidators.required),
      operators: new FormControl('', customValidators.required),
      value: new FormControl('', customValidators.required),
      andOrName: [],
      variableName: [],
    });
  }

  addLine() {
    const firstRowAndOr = this.usersForm.at(0)?.get('andOr');

    if (firstRowAndOr) {
      firstRowAndOr.removeValidators(Validators.required);
    }

    if (!this.formService.validForm(this.usersForm)) {
      if (firstRowAndOr) {
        firstRowAndOr.disable();
      }
      return;
    }

    if (firstRowAndOr) {
      firstRowAndOr.disable();
    }

    this.items.push(this.create_Users_FormGroup());
  }
  deleteLine(index: number): void {
    if (index >= 0 && index < this.usersForm.length) {
      this.usersForm.removeAt(index);
    }
  }
  onCancel() {
    this.ref.close();
  }

  selectedAndOR(event: any, form: FormGroup, i: number) {
    let data: any = this.andOR_List.find((item) => item.id == event);

    form.controls['andOrName'].setValue(data.name);
  }

  selectedVariable(event: any, form: FormGroup, i: number) {
    let data: any = this.variableList.find((item) => item.id == event);

    form.controls['variableName'].setValue(data.name);
  }

  andOR_List: { id: string; name: string }[] = [
    { id: '&&', name: 'AND' },
    { id: '||', name: 'OR' },
  ];
  operators_List: { id: string; name: string }[] = [
    { id: '<', name: '<' },
    { id: '>', name: '>' },
    { id: '=', name: '=' },
  ];

  variableList: any[] = [];
  initValriabaleList(id: number) {
    if (id) {
      this._subscriptionService.getWorkFlowsVariables(id, '', new PageInfo());
      this._subscriptionService.variablesDropDownList$.subscribe({
        next: (res) => {
          this.variableList = res;
        },
      });
    }
  }

  onSave(arr: any[]) {
    const data: any[] = arr.map(({ variableName, andOrName, ...res }) => res);
    let result = data.map((obj) => Object.values(obj).join('')).join('');
    console.log(result);
    this.ref.close(result);
  }
}
