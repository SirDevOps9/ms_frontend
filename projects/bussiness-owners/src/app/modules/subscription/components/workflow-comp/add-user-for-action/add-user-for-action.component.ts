import { Component, inject, Input, OnInit, output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FormsService, customValidators } from 'shared-lib';
import { SubscriptionService } from '../../../subscription.service';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { usersDto } from '../../../models';

@Component({
  selector: 'app-add-user-for-action',
  templateUrl: './add-user-for-action.component.html',
  styleUrl: './add-user-for-action.component.scss',
})
export class AddUserForActionComponent implements OnInit {
  usersForm: FormArray;
  @Input() stateId: number;
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
  }

  public get items(): FormArray {
    return this.usersForm as FormArray;
  }

  create_Users_FormGroup(useres?: any): FormGroup {
    return this.fb.group({
      id: new FormControl(useres?.id),
      userName: new FormControl(useres?.userName || '', customValidators.required),
      isNew: new FormControl(!useres),
    });
  }

  addLine() {
    if (!this.formService.validForm(this.usersForm)) return;
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
  showUpdate: boolean = false;
  onSave(obj: any) {
    if (!this.formService.validForm(this.usersForm)) return;
    this._subscriptionService.addUserForActions(this.dataToPatch.id, obj);
    this._subscriptionService.addUserForAction$.subscribe((res: any) => {
      if (res) {
        this.showUpdate = true;
      }
    });
  }
}
