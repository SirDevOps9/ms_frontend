import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ItemsService } from 'projects/apps-inventory/src/app/modules/items/items.service';
import { Colors } from 'projects/apps-inventory/src/app/modules/items/models';
import {
  customValidators,
  RouterService,
  FormsService,
  SharedLibraryEnums,
  ToasterService,
} from 'shared-lib';
import { ChangeSalesPhoneNumberComponent } from '../../../../components/change-sales-phone-number/change-sales-phone-number.component';

@Component({
  selector: 'app-manage-information-for-man',
  templateUrl: './manage-information-for-man.component.html',
  styleUrl: './manage-information-for-man.component.scss',
})
export class ManageInformationForManComponent implements OnInit {
  id: number;
  formGroup: FormGroup = new FormGroup({});
  ItemCategoryDropDown: { id: number; name: string }[] = [];
  tagDropDropDownLookup: { id: number; name: string }[] = [];
  taxesDropDropDownLookup: { id: number; nameAr: string; nameEn: string }[] = [];
  UOMCategoryDropDown: { id: number; name: string }[] = [];
  countriesLookup: [];
  colors = Colors();
  ngOnInit(): void {
    this.ItemCategoryDropDownData();
    this.tagDropDropDown();
    this.getCcountriesDropdown();
    this.taxesDropDropDown();
    this.UOMCategoryDropDownData();

    this.formGroup = this.fb.group({
      id: this.id,
      isActive: [''],
      name: ['', [customValidators.required]],
      photo: [''],
      categoryId: ['', [customValidators.required]],
      tags: [[]],
      countryId: [''],
      taxId: [null],
      shortName: [''],
      warranty: [''],
      isVatApplied: [true],
      specialCare: [''],
      lifeTime: [''],
      color: [''],
    });
    this.itemService.getItemDefinitionGeneral(this.id);
    this.itemService.getItemDefGeneral$.subscribe((data) => {
      if (data) {
        this.formGroup.patchValue({ ...data });
      }
    });

    this.formGroup.get('isVatApplied')?.valueChanges.subscribe((res) => {
      if (res == false) {
        this.formGroup.get('taxId')?.setValue(null);
        this.formGroup.get('taxId')?.updateValueAndValidity();
      }
    });
  }
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
  }
  taxesDropDropDown() {
    this.itemService.taxesDropDropDown();
    this.itemService.taxesLookupObs.subscribe((res) => {
      this.taxesDropDropDownLookup = res;
    });
  }

  UOMCategoryDropDownData() {
    this.itemService.UOMCategoryDropDown();
    this.itemService.UOMCategoryDropDownLookup.subscribe((res) => {
      this.UOMCategoryDropDown = res;
    });
  }
  ItemCategoryDropDownData() {
    this.itemService.ItemCategoryDropDown();
    this.itemService.itemCategoryLookupObs.subscribe((res) => {
      this.ItemCategoryDropDown = res;
    });
  }
  getCcountriesDropdown() {
    this.itemService.getCcountriesDropdown();

    this.itemService.sendCountriesLookupObs.subscribe((res) => {
      this.countriesLookup = res;
    });
  }
  tagDropDropDown() {
    this.itemService.tagDropDown();
    this.itemService.tagLookupObs.subscribe((res) => {
      this.tagDropDropDownLookup = res;
    });
  }
  changePhoneNumber() {
    const ref = this.dialog.open(ChangeSalesPhoneNumberComponent, {
      width: '300',
      height: '400px',
    });
    ref.onClose.subscribe((res: any) => {
      if (res) {
        console.log(res);
      }
    });
  }

  onCancel() {
    this._router.navigateTo('/masterdata/item-definition');
  }
  onSave() {
    if (!this.formService.validForm(this.formGroup, false)) return;
    this.itemService.saveItemDefinitionGeneral(this.formGroup.value);
  }
}
