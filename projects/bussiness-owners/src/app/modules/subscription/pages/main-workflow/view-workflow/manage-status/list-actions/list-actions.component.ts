import { Component, inject, Input, OnInit, output } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import {
  PageInfoResult,
  RouterService,
  PageInfo,
  ToasterService,
  FormsService,
  customValidators,
} from 'shared-lib';

import { SubscriptionService } from '../../../../../subscription.service';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'projects/apps-inventory/src/app/modules/items/items.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-actions',
  templateUrl: './list-actions.component.html',
  styleUrl: './list-actions.component.scss',
})
export class ListActionsComponent implements OnInit {
  // currentPageInfo: PageInfoResult = { totalItems: 0 };
  // searchTerm: string;
  // exportData: any[];
  // exportColumns: any[];

  // constructor(
  //   private _subService: SubscriptionService,
  //   public authService: AuthService,
  //   private dialog: DialogService,
  //   private routerService: RouterService

  // ) {
  // }
  // ngOnInit(): void {

  //   // this._subService.currentPageInfo.subscribe((currentPageInfo) => {
  //   //   this.currentPageInfo = currentPageInfo;
  //   // });
  // }

  // initworkFlowList() {
  //   if(this.statusId){
  //   this._subService.getWorkflowStatusActions(this.statusId,'', new PageInfo());

  //   this._subService.workflowStatusActionsList$.subscribe({
  //     next: (res) => {
  //       this.tableData = res;
  //     },
  //   });
  // }

  //   this._subService.currentPageInfo.subscribe((currentPageInfo) => {
  //     this.currentPageInfo = currentPageInfo;
  //   });
  // }

  // addNew(e: boolean) {
  //   if (e) {
  //     this.addAction();
  //   }
  // }
  // onSearchChange() {
  //   this._subService.getWorkflowStatusActions(this.statusId,this.searchTerm, new PageInfo());

  //   this._subService.workflowStatusActionsList$.subscribe({
  //     next: (res) => {
  //       this.tableData = res;
  //     },
  //   });

  //   this._subService.currentPageInfo.subscribe((currentPageInfo) => {
  //     this.currentPageInfo = currentPageInfo;
  //   });

  // }
  // onPageChange(pageInfo: PageInfo) {
  //   this._subService.getWorkflowStatusActions(this.statusId,'', new PageInfo());

  //   this._subService.workflowStatusActionsList$.subscribe({
  //     next: (res) => {
  //       this.tableData = res;
  //     },
  //   });
  // }
  // addAction() {
  //   this.showAddAction.emit(true)
  // }

  // // exportClick(e?: Event) {
  // //   this.exportOperationalData(this.searchTerm);
  // // }

  // // exportOperationalData(searchTerm: string) {
  // //   this.itemService.ExportOperationalTagList(searchTerm);

  // //   this.itemService.SendExportOperationalTagList$.subscribe((res) => {
  // //     this.exportData = res;
  // //   });
  // // }
  // onEdit(event: any) {
  //   this.sendDataToUpdate.emit(event)
  // }
  // onView(id: number) {
  //      this.routerService.navigateTo(`/workflow/${id}`);

  // }
  // }

  itemUomForm: FormGroup;
  unitUsagesName: [];
  @Input() workflowId: number;
  @Input() statusId: number;
  showAddAction = output<boolean>();
  showEditAction = output<boolean>();
  tableData: any[] = [];
  sendDataToUpdate = output<any>();
  constructor(
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private formService: FormsService
  ) {
    const id = Number(this._route.snapshot.paramMap.get('id'));
    this.stateIdDropdown(id);
  }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    this.initworkFlowList();
    this.createFormUom();

  }

  createFormUom() {
    this.itemUomForm = this.fb.group({
      uoms: this.fb.array([]),
    });
  }

  get uoms(): FormArray {
    return this.itemUomForm?.get('uoms') as FormArray;
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
    return index === this.uoms.length - 1;
  }



  uomss: any[] = [];

  statusDropdown: { id: number; name: string }[] = [];

  stateIdDropdown(id: number) {
    this._subService.getStatusDropDown(id, '', new PageInfo());

    this._subService.statusDropDownList$.subscribe({
      next: (res) => {
        this.statusDropdown = res;
      },
    });
  }
  addLine() {
    if (!this.formService.validForm(this.itemUomForm)) return;

    // Create a new empty UOM FormGroup
    const newUomFormGroup = this.createUomFormGroup({}); // Pass an empty object for defaults
    this.uoms.push(newUomFormGroup); // Add the new form group to the form array
  
    console.log('New empty line added:', newUomFormGroup.value);
  }
  _subService = inject(SubscriptionService);

  initworkFlowList() {
    if (this.statusId) {
      this._subService.getWorkflowStatusActions(this.statusId, '', new PageInfo());

      this._subService.workflowStatusActionsList$.subscribe({
        next: (res) => {
          this.tableData = res;
          // this.patchValues(res);
          this.uoms.clear();

          res.forEach((item : any) => {

            const formGroup = this.createUomFormGroup(item);
            this.uoms.push(formGroup)
          })
        },
      });
    }
  }
  patchValues(data: any) {
    // this.uoms.clear();
    if(data){

      data.forEach((item : any) => {
        const formGroup = this.createUomFormGroup(item);
        this.uoms.push(formGroup);
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
    if (!this.formService.validForm(this.uoms)) return;
    delete obj.users;
    delete obj.toStateIdName;

    this._subService.editActions(obj);
    this._subService.updateAction$.subscribe((res: any) => {
      console.log(res);
    });
  }
  onSave(obj: any) {
    if (!this.formService.validForm(this.uoms)) return;
    delete obj.users;
    delete obj.toStateIdName;
    delete obj.id;
    this._subService.addActions(this.statusId, obj);
    this._subService.addAction$.subscribe((res: any) => {
     if(res){

       this.initworkFlowList();
     }
    });
  }
  onDelete(id:number){
    this._subService.deleteAction(id)    
      }
  deleteLine(index: number): void {
    if (index >= 0 && index < this.uoms.length) {
      this.uoms.removeAt(index);
    }
  }

  
}
