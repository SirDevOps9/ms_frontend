import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import {
  RouterService,
  FormsService,
  SharedLibraryEnums,
  ToasterService,
  customValidators,
} from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { AddVariantPopupComponent } from '../../../components/add-variant-popup/add-variant-popup.component';
import { ViewVariantPopupComponent } from '../../../components/view-variant-popup/view-variant-popup.component';

@Component({
  selector: 'app-item-definition-attributes-variants',
  templateUrl: './item-definition-attributes-variants.component.html',
  styleUrl: './item-definition-attributes-variants.component.scss',
})
export class ItemDefinitionAttributesVariantsComponent implements OnInit {
  id: any;
  itemDefinitionForm: FormGroup = new FormGroup({});
  ItemVariantsByItemIdDropDown: { id: number; nameEn: string }[] = [];

  constructor(
    private _router: RouterService,
    private fb: FormBuilder,
    private formService: FormsService,
    public sharedLibEnums: SharedLibraryEnums,
    private dialog: DialogService,
    private route: ActivatedRoute,
    private toaserService: ToasterService,
    private itemService: ItemsService
  ) {
    this.id = this.route.snapshot.params['id'];
    console.log(this._router.getCurrentUrl());
  }
  ngOnInit(): void {
    this.itemDefinitionForm = this.fb.group({
      id: this.id,
      code: [''],
      name: ['', [customValidators.required]],
      photo: [''],
      categoryId: ['', [customValidators.required]],
      tags: [''],

      countryId: [''],
      defaultUOMCategoryId: ['', [customValidators.required]],
      taxId: [''],
      shortName: [''],
      warranty: [''],
      isVatApplied: [''],
      specialCare: [''],
      lifeTime: [''],
      color: [''],
      uomId: [''],
      uom: this.fb.array([]),
      barcode: this.fb.array([]),
      attribute: this.fb.array([]),
      hasExpiryDate: [''],
      trackingId: [''],
      itemAccounting: this.fb.group({
        pAccount: 0,
        prAccount: 0,
        sAccount: 0,
        srAccount: 0,
      }),
    });
  }
  generateVariant() {
    this.itemService.generateVariant({ itemId: this.id });
  }
  addLineAttribute() {
    const dialogRef = this.dialog.open(AddVariantPopupComponent, {
      width: '50%',
      height: '430px',
      data: this.id,
    });

    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.AttributeForm.push(this.createAttributeFormGroup(res));
        this.itemService.getAttributeVariantById(this.id);
        this.getItemVariantsByItemIdDropDown();
      }
    });
  }
  get AttributeForm() {
    return this.itemDefinitionForm.get('attribute') as FormArray;
  }
  createAttributeFormGroup(res: any): FormGroup {
    return this.fb.group({
      name: res,
      attributeGroupId: 0,
      status: true,
      itemId: null,
      id: null,
    });
  }

  getItemVariantsByItemIdDropDown() {
    this.itemService.getItemVariantsByItemIdDropDown(this.id);
    this.itemService.ItemVariantsByItemIdDropDownObs.subscribe((res) => {
      this.ItemVariantsByItemIdDropDown = res;
    });
  }

  async confirmChange(event: any, itemDefAttributeGroup: FormGroup) {
    const confirmed = await this.toaserService.showConfirm('ConfirmButtonTexttochangestatus');
    if (confirmed) {
      const command = {
        id: itemDefAttributeGroup.get('id')?.value,
      };
      this.itemService.ActivateVairiantGroup(command);
    } else {
      // Properly toggle the status value
      const currentStatus = itemDefAttributeGroup.get('status')?.value;
      itemDefAttributeGroup.get('status')?.setValue(!currentStatus);
    }
  }

  onViewAttribute(form: FormGroup) {
    const dialogRef = this.dialog.open(ViewVariantPopupComponent, {
      width: '50%',
      height: '300px',

      data: form.get('id')?.value,
    });

    dialogRef.onClose.subscribe((res) => {});
  }

  onDeleteAttribute(itemDefAttributeGroup: FormGroup) {
    this.itemService.deleteVariant(itemDefAttributeGroup.get('id')?.value);
  }
}
