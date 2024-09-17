import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  FormsService,
  LanguageService,
  RouterService,
  ToasterService,
  customValidators,
} from 'shared-lib';
import { AccountService } from '../../../account.service';
import { addCostCenter, parentCostCenter } from '../../../models';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-cost-center',
  templateUrl: './add-cost-center.component.html',
  styleUrl: './add-cost-center.component.scss',
})
export class AddCostCenterComponent implements OnInit {
  formGroup: FormGroup;
  parentAccounts: parentCostCenter[] = [];
  @Input() newChiled?: boolean;
  @Input() parentAddedId?: number | undefined;
  @Input() parentStatus: boolean;

  @Output() operationCompleted = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private accountService: AccountService,
    private toaserService: ToasterService,
    private title: Title,
    private langService: LanguageService
  ) {
    this.title.setTitle(this.langService.transalte('costCenter.AddCostCenter'));

    this.formGroup = this.formBuilder.group({
      name: new FormControl('', customValidators.required),
      parentId: new FormControl(null),
      isDetail: new FormControl(false),
      isActive: new FormControl(true),
    });
  }
  ngOnInit() {
    if (this.parentAddedId) {
      this.formGroup.get('parentId')?.patchValue(this.parentAddedId);
      this.formGroup.get('isActive')?.patchValue(this.parentStatus);
    } else {
      this.formGroup.get('isActive')?.patchValue(true);
    }
    this.GetAllParentsCostCenters();
    this.accountService.costparentAccounts.subscribe((res) => {
      if (res) {
        this.parentAccounts = res;
      }
    });
  }
  addChiled() {
    console.log(this.formGroup.value, 'this.formsService');

    if (!this.formsService.validForm(this.formGroup, false)) return;

    let obj: addCostCenter = this.formGroup.value;

    this.accountService.AddCostCenter(obj);

    setTimeout(() => {
      this.accountService.savedAddedCost.subscribe((res) => {
        if (res) {
          this.operationCompleted.emit(res);
        }
      });
    }, 500);
  }
  GetAllParentsCostCenters() {
    this.accountService.GetAllParentsCostCenters();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['newChiled']) {
      if (this.newChiled == true) {
        delete this.formGroup.value.accountCode;
        this.formGroup.get('accountCode')?.setValue([null]);
        this.formGroup.get('parentId')?.setValue(null);
        this.formGroup.get('isActive')?.setValue(true);
      }
    }
    if (changes['parentStatus']) {
      if (this.parentStatus == true) {
        this.formGroup.get('isActive')?.setValue(true);
      } else {
        this.formGroup.get('isActive')?.setValue(false);
      }
    }
  }
  cancelClick() {
    this.operationCompleted.emit(false);
  }
}
