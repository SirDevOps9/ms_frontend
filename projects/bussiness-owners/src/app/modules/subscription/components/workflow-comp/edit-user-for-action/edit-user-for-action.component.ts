import { Component, inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsService, customValidators } from 'shared-lib';
import { usersDto } from '../../../models';
import { SubscriptionService } from '../../../subscription.service';

@Component({
  selector: 'app-edit-user-for-action',
  templateUrl: './edit-user-for-action.component.html',
  styleUrl: './edit-user-for-action.component.scss',
})
export class EditUserForActionComponent implements OnInit {
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

    if (this.dataToPatch.id) {
      this._subscriptionService.getUsersForActionsByID(this.dataToPatch.id);
      this._subscriptionService.UsersForActions$.subscribe({
        next: (res: usersDto[]) => {
          this.usersForm.clear();

          res.forEach((user) => {
            this.items.push(this.create_Users_FormGroup(user));
          });
        },
      });
    } else {
      this.usersForm = this.fb.array([this.create_Users_FormGroup()]);
    }
  }

  public get items(): FormArray {
    return this.usersForm as FormArray;
  }

  create_Users_FormGroup(useres?: any): FormGroup {
    debugger;
    return this.fb.group({
      id: new FormControl(useres?.id),
      userName: new FormControl(useres?.userName || '', customValidators.required),
    });
  }

  addLine() {
    if (!this.formService.validForm(this.usersForm)) return;
    this.items.push(this.create_Users_FormGroup());
  }
  onDelete(id: number) {
    this._subscriptionService.deleteUser(id);
  }

  deleteLine(index: number): void {
    if (index >= 0 && index < this.usersForm.length) {
      this.usersForm.removeAt(index);
    }
  }
  onCancel() {
    this.ref.close();
  }
  onSave(obj: any) {
    if (!this.formService.validForm(this.usersForm)) return;
    this._subscriptionService.editUserForActions(obj);
    this._subscriptionService.editUserForAction$.subscribe((res: any) => {
      if (res) {
      }
    });
  }
}
