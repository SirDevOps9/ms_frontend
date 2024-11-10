import { Component, inject, Input, OnInit, output } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { PageInfo, FormsService, customValidators } from 'shared-lib';

import { SubscriptionService } from '../../../../../subscription.service';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';

import { ActionDto } from '../../../../../models';
import { AddUserForActionComponent } from '../../../../../components/workflow-comp/add-user-for-action/add-user-for-action.component';
import { EditUserForActionComponent } from '../../../../../components/workflow-comp/edit-user-for-action/edit-user-for-action.component';

@Component({
  selector: 'app-list-actions',
  templateUrl: './list-actions.component.html',
  styleUrl: './list-actions.component.scss',
})
export class ListActionsComponent implements OnInit {
  actionsForm: FormGroup;
  unitUsagesName: [];
  @Input() workflowId: number;
  @Input() statusId: number;
  showAddAction = output<boolean>();
  showEditAction = output<boolean>();
  tableData: ActionDto[] = [];
  sendDataToUpdate = output<any>();
  constructor(
    private fb: FormBuilder,
    private dialog: DialogService,
    private formService: FormsService
  ) {
    // const id = Number(this._route.snapshot.paramMap.get('id'));
    this.stateIdDropdown();
  }

  ngOnInit(): void {}
  ngOnChanges(): void {
    this.initActionsList();
    this.createFormUom();
    if (this.statusId) {
      this.stateIdDropdown();
    }
  }

  createFormUom() {
    this.actionsForm = this.fb.group({
      actions: this.fb.array([]),
    });
  }

  get actions(): FormArray {
    return this.actionsForm?.get('actions') as FormArray;
  }
  test: string = '';
  createUomFormGroup(item: any): FormGroup {
    return this.fb.group({
      id: [item.id || ''],
      name: [item.name || '', customValidators.required],
      toStateId: [item.toStateId, customValidators.required],
      conditionExpression: [item.conditionExpression || ''],
      toStateIdName: [item.toStateName || ''],
      users: [item.users || []],
      // Add users as a non-editable property
    });
  }

  isLast(index: number): boolean {
    return index === this.actions.length - 1;
  }

  statusDropdown: { id: number; name: string }[] = [];

  stateIdDropdown() {
    this._subService.getStatusDropDown(this.workflowId, '', new PageInfo());
    debugger;

    this._subService.statusDropDownList$.subscribe({
      next: (res) => {
        this.statusDropdown = Array.isArray(res) ? res.filter((x) => x.id != this.statusId) : [];
      },
    });
  }
  addLine() {
    if (!this.formService.validForm(this.actionsForm)) return;

    // Create a new empty UOM FormGroup
    const newUomFormGroup = this.createUomFormGroup({}); // Pass an empty object for defaults
    this.actions.push(newUomFormGroup); // Add the new form group to the form array

    console.log('New empty line added:', newUomFormGroup.value);
  }
  _subService = inject(SubscriptionService);

  initActionsList() {
    if (this.statusId) {
      this._subService.getWorkflowStatusActions(this.statusId, '', new PageInfo());

      this._subService.workflowStatusActionsList$.subscribe({
        next: (res: any) => {
          this.tableData = res;
          // this.patchValues(res);
          if (this.actions) {
            this.actions.clear();
          }

          //           this.uoms.clear();
          // data.uoms.forEach((uom: any) => {
          //   if (uom.users && Array.isArray(uom.users)) {
          //     uom.users = uom.users.slice(0, 3);
          //   }
          //   this.uoms.push(this.createUomFormGroup(uom));
          // });

          // this.test = this.uoms.at(0)?.get('nameEn')?.value;

          res.forEach((item: any) => {
            if (item.users && Array.isArray(item.users)) {
              item.users = item.users.slice(0, 3);
            }
            const formGroup = this.createUomFormGroup(item);
            this.actions.push(formGroup);
          });
        },
      });
    }
  }
  patchValues(data: any) {
    // this.actions.clear();
    if (data) {
      data.forEach((item: any) => {
        const formGroup = this.createUomFormGroup(item);
        this.actions.push(formGroup);
      });
    }
  }

  displayState(event: any, formGroup: FormGroup) {
    const selectedOption = this.statusDropdown.find((option) => option.id === event);
    if (selectedOption) {
      formGroup.controls['toStateId'].setValue(selectedOption.id);
      formGroup.controls['toStateIdName'].setValue(selectedOption.name);
    }
  }
  // Method to enable editing for a row
  onEdit(fg: FormGroup) {
    // fg.get('isEditing')?.setValue(true);
  }

  onUpdate(obj: any) {
    if (!this.formService.validForm(this.actions)) return;
    delete obj.users;
    delete obj.toStateIdName;

    this._subService.editActions(obj);
    this._subService.updateAction$.subscribe((res: any) => {
      console.log(res);
    });
  }
  onSave(obj: any) {
    if (!this.formService.validForm(this.actions)) return;
    delete obj.users;
    delete obj.toStateIdName;
    delete obj.id;
    this._subService.addActions(this.statusId, obj);
    this._subService.addAction$.subscribe((res: any) => {
      if (res) {
        this.initActionsList();
      }
    });
  }
  onDelete(id: number) {
    this._subService.deleteAction(id);
  }
  deleteLine(index: number): void {
    if (index >= 0 && index < this.actions.length) {
      this.actions.removeAt(index);
    }
  }
  updateUserDialog(fg: any) {
    console.log(fg.value);

    const ref = this.dialog.open(EditUserForActionComponent, {
      width: '800px',
      height: '500px',
      data: fg.value,
    });
    ref.onClose.subscribe(() => {
      this.initActionsList();
    });
  }
  addUserDialog(fg: any) {
    console.log(fg.value);

    const ref = this.dialog.open(AddUserForActionComponent, {
      width: '800px',
      height: '500px',
      data: fg.value,
    });
    ref.onClose.subscribe(() => {
      this.initActionsList();
    });
  }
}
