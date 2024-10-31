import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { LayoutService } from 'apps-shared-lib';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsService, customValidators } from 'shared-lib';
import { ItemsService } from '../../../../../items.service';
import { UomCodeLookup } from '../../../../../models';

@Component({
  selector: 'app-edit-category-uom',
  templateUrl: './edit-category-uom.component.html',
  styleUrl: './edit-category-uom.component.scss'
})
export class EditCategoryUomComponent {
  itemDefinitionForm: FormGroup;
  selectedModules: number[] = [];
  uOMCategoryDropDownLookupData : { id: number;  name: string }[] = []
  ItemCategoryDropDown : { id: number;  name: string }[] = []
  UOMCategoryDropDown : UomCodeLookup[] = []
  @Output() dataFetched = new EventEmitter<any>();
  @Input() selectedName: string;
  selectedData: any;
  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private fb: FormBuilder,
    public layoutService: LayoutService,
    private ref: DynamicDialogRef,
    private formsService: FormsService,
    private itemsService : ItemsService,

  ) {

  }

  ngOnInit() {




    this.initializeItemDefinition()
    this.getUOMCategoryDropDown()
    if (this.config.data) {
      this.itemDefinitionForm.patchValue({ categoryId: this.config.data });
  }


  }


  getUOMCategoryDropDown() {
    this.itemsService.getUOMCategoryDropDown()
    this.itemsService.uOMCategoryDropDownObs.subscribe(res=>{
      this.uOMCategoryDropDownLookupData= res



    })
  }


  UOMCategoryDropDownChanged(event: any) {
    this.itemDefinitionForm.get('uomId')?.setValue(event)
  }

 initializeItemDefinition() {
    this.itemDefinitionForm = this.fb.group({
      categoryId: new FormControl(this.config.data || '', [customValidators.required]),
      uoms: this.fb.array([])
    });
}
  get uoms(): FormArray {
    return this.itemDefinitionForm.get('uoms') as FormArray;
  }

  onChanged(selectedValue: any) {
    this.itemsService.getUOMCategoryDropDownCategoryId(selectedValue);
    this.itemsService.uOMCategoryDropDownByIdObs.subscribe((data) => {
      this.selectedData = data;
      console.log(data);
    });
  }

  onSave() {
    this.dataFetched.emit(this.selectedData);
    this.ref.close(this.selectedData);
  }
  onCancel() {
    this.ref.close();
  }

  close() {
    this.ref.close();
  }
  onSubmit(text : string) {
    if (!this.formsService.validForm(this.itemDefinitionForm)) return;
    const { typeId, ...arg } = this.itemDefinitionForm.value;
    this.itemsService.addItemDefinition(arg , this.ref , text)

  }

  onSaveConinue(text : string){
    if (!this.formsService.validForm(this.itemDefinitionForm)) return;
    const { typeId, ...arg } = this.itemDefinitionForm.value;

    this.itemsService.addItemDefinition(arg , this.ref , text)
  }
}
