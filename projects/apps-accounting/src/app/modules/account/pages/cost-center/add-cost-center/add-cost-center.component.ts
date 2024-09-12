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
      isActive : new FormControl(true)
    });
  }
  ngOnInit() {
    if (this.parentAddedId) {
      this.formGroup.get('parentId')?.setValue(this.parentAddedId);
    }
    this.GetAllParentsCostCenters();
    this.accountService.costparentAccounts.subscribe((res) => {
      if (res) {
        this.parentAccounts = res;
      }
    });
  }
  addChiled() {
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
      }
    }
  }
  cancelClick() {
    this.operationCompleted.emit(false);
  }
}
