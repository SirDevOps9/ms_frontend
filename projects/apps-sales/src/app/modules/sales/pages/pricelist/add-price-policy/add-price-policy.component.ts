import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { customValidators, FormsService, LanguageService, RouterService, ToasterService } from 'shared-lib';
import { MultiSelectItemsComponent } from '../../../components/multi-select-items/multi-select-items.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ItemDto } from '../../../models';
import { SalesService } from '../../../sales.service';
import { UpdetePricePolicyComponent } from '../../../components/updete-price-policy/updete-price-policy.component';
import { PopupExcelComponent } from '../../../components/popup-excel/popup-excel.component';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-add-price-policy',
  templateUrl: './add-price-policy.component.html',
  styleUrl: './add-price-policy.component.scss'
})
export class AddPricePolicyComponent implements OnInit ,OnDestroy  {
  rowDataMap: { [key: number]: { uomOptions: any[] } } = {};
  duplicateLine: boolean;
  data: any;
  rowDuplicate: number;
  listOfExcel: any[] = [];
  items: ItemDto[] = [];
  filteredPricePolicies: any;

  addForm: FormGroup;
  @ViewChild('dt') dt: any | undefined;

  ngOnInit() {
    this.subscribes()
    this.initItemsData()
    this.initializeForm()
  }
  initializeForm() {
    this.addForm = this.formBuilder.group({

      code: new FormControl(''),
      policySource: new FormControl('Manual'),
      name: new FormControl('', [customValidators.required, customValidators.length(1, 100)]),
      policyItemsList: this.formBuilder.array([]),

    });

  }
  get pricePolicyFormArray() {
    return this.addForm.get('policyItemsList') as FormArray;
  }
  addNewRow() {
    if (!this.duplicateLine) {
      const policyItemsList = this.addForm.get('policyItemsList') as FormArray;

      // Assign validators for each item in the FormArray
      policyItemsList.controls.forEach((control) => {
        control.get('price')?.clearValidators();
        control.get('price')?.updateValueAndValidity(); // Update each control after setting validators

      });

      // Update the main form's validity
      this.addForm?.updateValueAndValidity();
      if (!this.formsService.validForm(this.pricePolicyFormArray, false)) return;


      let newLine = this.formBuilder.group(
        {
          itemId: new FormControl('', [customValidators.required]),
          itemName: new FormControl(''),
          itemCode: new FormControl(''),
          isVatApplied: new FormControl(false),
          uomId: new FormControl(''),
          uomName: new FormControl(''),
          itemVariantId: new FormControl(''),
          itemVariantName: new FormControl(''),
          price: new FormControl(Number(0), [customValidators.required]),
          priceWithVat: new FormControl(0),
          taxId: new FormControl(null),
          taxRatio: new FormControl(''),
          uomOptions: new FormControl(''),
          itemCategoryNameAr: new FormControl(''),
          itemCategoryNameEn: new FormControl(''),
          hasExpiryDate: new FormControl(''),
          uomNameAr: new FormControl(''),
          uomNameEn: new FormControl(''),
          categoryType: new FormControl(''),
          name: new FormControl(''),
          id: new FormControl(),

        }
      );
      newLine.updateValueAndValidity();
      this.pricePolicyFormArray.push(newLine);

      this.filteredPricePolicies = this.pricePolicyFormArray
    } else {
      this.toasterService.showError(
        this.languageService.transalte('messages.error'),
        this.languageService.transalte('messages.duplicateItem')
      );
    }
  }

  setRowData(rowIndex: number, selectedItemId: number, price: number) {
    const selectedItem = this.items.find(item => item.id === selectedItemId);
    const rowForm = this.pricePolicyFormArray.at(rowIndex) as FormGroup;

    if (selectedItem) {
      const uomOptions: any = selectedItem.itemsUOM;
      rowForm.get('uomOptions')?.setValue(uomOptions);
      rowForm.get('uomId')?.reset(); // Reset the UOM value to avoid conflicts
      rowForm.get('uomId')?.setValue(selectedItem.uomId);
      rowForm.get('uomName')?.setValue(selectedItem.uomNameEn);
      rowForm.get('itemName')?.setValue(selectedItem.itemName);
      rowForm.get('itemVariantId')?.setValue(selectedItem.itemVariantId);
      rowForm.get('itemVariantName')?.setValue(selectedItem.itemVariantName);
      rowForm.get('itemId')?.setValue(selectedItem.itemId);
      rowForm.get('itemCode')?.setValue(selectedItem.itemCode);
      rowForm.get('taxId')?.setValue(selectedItem.taxId || null);
      rowForm.get('taxRatio')?.setValue(selectedItem.taxRatio);

      // Additional fields
      rowForm.get('itemCategoryNameAr')?.setValue(selectedItem.itemCategoryNameAr);
      rowForm.get('itemCategoryNameEn')?.setValue(selectedItem.itemCategoryNameEn);
      rowForm.get('hasExpiryDate')?.setValue(selectedItem.hasExpiryDate);
      rowForm.get('uomNameAr')?.setValue(selectedItem.uomNameAr);
      rowForm.get('uomNameEn')?.setValue(selectedItem.uomNameEn);
      rowForm.get('categoryType')?.setValue(selectedItem.categoryType);
      rowForm.get('id')?.setValue(rowIndex + 1);
      rowForm.get('price')?.setValue(price);

      const isDuplicate = this.pricePolicyFormArray.controls.some((element: any, index: number) => {
        if (index !== rowIndex) {
          const { uomId, itemId, itemVariantId } = element.value;
          const rowUomId = rowForm.get('uomId')?.value;
          const rowItemId = rowForm.get('itemId')?.value;
          const rowItemVariantId = rowForm.get('itemVariantId')?.value;

          if (uomId === rowUomId && itemId === rowItemId && itemVariantId === rowItemVariantId) {
            this.toasterService.showError(
              this.languageService.transalte('messages.error'),
              this.languageService.transalte('messages.duplicateItem')
            );
            this.rowDuplicate = rowIndex;
            this.duplicateLine = true;
            return true; // Stop checking on first match
          }
          this.duplicateLine = false;

          return false;
        }
        this.duplicateLine = false;

        return false;
      });
    } else {
      if (this.rowDuplicate == rowIndex) {
        this.rowDuplicate = 0
      }
      rowForm.reset();
      rowForm.get('uomOptions')?.setValue([]);
      const isDuplicate = this.pricePolicyFormArray.controls.some((element: any, index: number) => {
        if (rowIndex !== index) {
          const { uomId, itemId, itemVariantId } = element.value;
          const rowUomId = rowForm.get('uomId')?.value;
          const rowItemId = rowForm.get('itemId')?.value;
          const rowItemVariantId = rowForm.get('itemVariantId')?.value;

          if (uomId === rowUomId && itemId === rowItemId && itemVariantId === rowItemVariantId) {
            this.toasterService.showError(
              this.languageService.transalte('messages.error'),
              this.languageService.transalte('messages.duplicateItem')
            );
            this.rowDuplicate = rowIndex
            this.duplicateLine = true
            return true; // يوقف التكرار عند أول تطابق
          }
          this.rowDuplicate = 0
          this.duplicateLine = false

          return false;
        }
        return false;
      });

    }

  }
  setExcelData(rowIndex: number, selectedItemId: number, selectedItem: ItemDto) {
    const selectedItems = this.items.find(item => item.id === selectedItemId);
    const rowForm = this.pricePolicyFormArray.at(rowIndex) as FormGroup;

    if (selectedItems) {
      const uomOptions: any = selectedItem.itemsUOM;
      rowForm.get('uomOptions')?.setValue(uomOptions);
      rowForm.get('uomId')?.reset(); // Reset the UOM value to avoid conflicts
      rowForm.get('uomId')?.setValue(selectedItem.uomId);
      rowForm.get('uomName')?.setValue(selectedItem.uomNameEn);
      rowForm.get('itemName')?.setValue(selectedItem.itemName);
      rowForm.get('itemVariantId')?.setValue(selectedItem.itemVariantId);
      rowForm.get('itemVariantName')?.setValue(selectedItem.itemVariantName);
      rowForm.get('itemId')?.setValue(selectedItem.itemId);
      rowForm.get('itemCode')?.setValue(selectedItem.itemCode);
      rowForm.get('taxId')?.setValue(selectedItem.taxId || null);
      rowForm.get('taxRatio')?.setValue(selectedItem.taxRatio);

      // Additional fields
      rowForm.get('itemCategoryNameAr')?.setValue(selectedItem.itemCategoryNameAr);
      rowForm.get('itemCategoryNameEn')?.setValue(selectedItem.itemCategoryNameEn);
      rowForm.get('hasExpiryDate')?.setValue(selectedItem.hasExpiryDate);
      rowForm.get('uomNameAr')?.setValue(selectedItem.uomNameAr);
      rowForm.get('uomNameEn')?.setValue(selectedItem.uomNameEn);
      rowForm.get('categoryType')?.setValue(selectedItem.categoryType);
      rowForm.get('id')?.setValue(rowIndex + 1);
      rowForm.get('price')?.setValue(selectedItem.price);

      const isDuplicate = this.pricePolicyFormArray.controls.some((element: any, index: number) => {
        if (index !== rowIndex) {
          const { uomId, itemId, itemVariantId } = element.value;
          const rowUomId = rowForm.get('uomId')?.value;
          const rowItemId = rowForm.get('itemId')?.value;
          const rowItemVariantId = rowForm.get('itemVariantId')?.value;

          if (uomId === rowUomId && itemId === rowItemId && itemVariantId === rowItemVariantId) {
            this.toasterService.showError(
              this.languageService.transalte('messages.error'),
              this.languageService.transalte('messages.duplicateItem')
            );
            this.rowDuplicate = rowIndex;
            this.duplicateLine = true;
            return true; // Stop checking on first match
          }
          this.duplicateLine = false;

          return false;
        }
        this.duplicateLine = false;

        return false;
      });
    } else {
      if (this.rowDuplicate == rowIndex) {
        this.rowDuplicate = 0
      }
      rowForm.reset();
      rowForm.get('uomOptions')?.setValue([]);
      const isDuplicate = this.pricePolicyFormArray.controls.some((element: any, index: number) => {
        if (rowIndex !== index) {
          const { uomId, itemId, itemVariantId } = element.value;
          const rowUomId = rowForm.get('uomId')?.value;
          const rowItemId = rowForm.get('itemId')?.value;
          const rowItemVariantId = rowForm.get('itemVariantId')?.value;

          if (uomId === rowUomId && itemId === rowItemId && itemVariantId === rowItemVariantId) {
            this.toasterService.showError(
              this.languageService.transalte('messages.error'),
              this.languageService.transalte('messages.duplicateItem')
            );
            this.rowDuplicate = rowIndex
            this.duplicateLine = true
            return true; // يوقف التكرار عند أول تطابق
          }
          this.rowDuplicate = 0
          this.duplicateLine = false

          return false;
        }
        return false;
      });

    }

  }


  setPriceWithVat(index: number, price: any) {
    const rowForm = this.pricePolicyFormArray.at(index) as FormGroup;
    rowForm.get('priceWithVat')?.setValue(0);
    const taxRatio: any = rowForm.get('taxRatio')?.value
    let priceWithVat = Number(price) + ((Number(price) * taxRatio) / 100)
    if (rowForm.get('isVatApplied')?.value == true) {
      rowForm.get('priceWithVat')?.setValue(priceWithVat);
    } else {
      rowForm.get('priceWithVat')?.setValue(price);
    }
  }
  async deleteRow(index: number) {
    const confirmed = await this.toasterService.showConfirm('Delete');
    if (confirmed) {
      this.pricePolicyFormArray.removeAt(index);

    }
  }
  initItemsData() {
    this.salesService.getLatestItems('');
  }
  subscribes() {
    const selectedPricePolicyId = localStorage.getItem('selectedPricePolicyId');
    if(selectedPricePolicyId){
      this.salesService.getPricePolicyById(Number(selectedPricePolicyId))
    
    }
    this.salesService.latestItemsList.subscribe({
      next: (res) => {
        // this.items = res;
        this.items = res.map((item, index) => ({
          ...item,    // Spread existing properties from the original item
          id: index + 1 // Add an `id` field starting from 1
        }));
      },
    });
this.salesService.pricePolicyListObser.subscribe((res) => {
  if(res.id){
    res?.policyItemsList?.forEach((element: ItemDto, index: number) => {
          this.addNewRow();
          this.setExcelData(index, element.itemId, element);
        });

      }

    });

  }
  openDialog(index: number) {
    const ref = this.dialog.open(MultiSelectItemsComponent, {
      width: '1000px',
      height: '600px',
    });
    ref.onClose.subscribe((selectedItems: ItemDto) => {
      if (selectedItems) {
        const uomOptions: any = selectedItems.itemsUOM
        const rowForm = this.pricePolicyFormArray.at(index) as FormGroup;
        rowForm.get('uomOptions')?.setValue(uomOptions); // Store options for template access
        rowForm.get('uomId')?.reset(); // Reset the UOM value to avoid conflicts
        rowForm.get('uomId')?.setValue(selectedItems.uomId); // Optionally set the first UOM
        rowForm.get('uomName')?.setValue(selectedItems.uomNameAr); // Optionally set the first UOM
        rowForm.get('itemName')?.setValue(selectedItems.itemName); // Optionally set the first UOM
        rowForm.get('itemVariantId')?.setValue(selectedItems.itemVariantId); // Optionally set the first UOM
        rowForm.get('itemVariantName')?.setValue(selectedItems.itemVariantName); // Optionally set the first UOM
        rowForm.get('itemId')?.setValue(selectedItems.itemId)
        rowForm.get('itemCode')?.setValue(selectedItems.itemCode)
        rowForm.get('taxId')?.setValue(selectedItems.taxId)
        rowForm.get('id')?.setValue(index + 1)
      }

    });
  }
  update() {
    if (this.pricePolicyFormArray.value.length > 0) {


      if (!this.duplicateLine) {

        const ref = this.dialog.open(UpdetePricePolicyComponent, {
          width: '1000px',
          height: '600px',
          data: this.pricePolicyFormArray
        });

        ref.onClose.subscribe((selectedItems: any) => {
          if (selectedItems) {
            selectedItems.value.forEach((item: ItemDto) => {
              const index = this.pricePolicyFormArray.controls.findIndex(
                (control) => control.get('id')?.value === item.id
              );

              if (index !== -1) {
                this.pricePolicyFormArray.at(index).patchValue(item);
                this.setPriceWithVat(index, item.price)
              }
            });
          }
        });
      } else {
        this.toasterService.showError(
          this.languageService.transalte('messages.error'),
          this.languageService.transalte('messages.duplicateItem')
        );

      }
    } else {
      this.toasterService.showError(
        this.languageService.transalte('messages.error'),
        this.languageService.transalte('messages.noItemSelected')
      );

    }
  }
  setUomIdValue(indexLine: number, e: any) {
    const rowForm = this.pricePolicyFormArray.at(indexLine) as FormGroup;
    const options = rowForm.get('uomOptions')?.value
    const selectedItem = options.find((item: any) => item.uomId === e);
    rowForm.get('uomName')?.setValue(selectedItem.uomNameAr); // Optionally set the first UOM

    const isDuplicate = this.pricePolicyFormArray.controls.some((element: any, index: number) => {
      if (indexLine !== index) {
        const { uomId, itemId, itemVariantId } = element.value;
        const rowUomId = rowForm.get('uomId')?.value;
        const rowItemId = rowForm.get('itemId')?.value;
        const rowItemVariantId = rowForm.get('itemVariantId')?.value;

        if (uomId === rowUomId && itemId === rowItemId && itemVariantId === rowItemVariantId) {
          this.toasterService.showError(
            this.languageService.transalte('messages.error'),
            this.languageService.transalte('messages.duplicateItem')
          );
          this.rowDuplicate = indexLine
          this.duplicateLine = true
          return true; // يوقف التكرار عند أول تطابق
        }
        this.rowDuplicate = 0
        this.duplicateLine = false

        return false;
      }
      return false;
    });


  }
  save() {
    if (this.addForm.value.policyItemsList.length > 0) {
      if (!this.duplicateLine) {
        const policyItemsList = this.addForm.get('policyItemsList') as FormArray;

        // Assign validators for each item in the FormArray
        policyItemsList.controls.forEach((control) => {
          control.get('price')?.setValidators([customValidators.nonZero, customValidators.required]);
          control.get('price')?.updateValueAndValidity(); // Update each control after setting validators

        });

        // Update the main form's validity
        this.addForm.updateValueAndValidity();
        if (!this.formsService.validForm(this.addForm, false)) return;

        const transformedFormValue = {
          ...this.addForm.value,
          policyItemsList: this.addForm.value.policyItemsList.map((detail: any) => ({
            price: Number(detail.price),  // Ensure price is a number
            priceWithVat: Number(detail.priceWithVat),  // If applicable
            itemId: detail.itemId,
            uomId: detail.uomId,
            itemVariantId: detail.itemVariantId,
            isVatApplied: detail.isVatApplied, // Ensure it's a boolean
            taxId: detail.taxId || null,
          }
          )),
        };

        this.salesService.addPricePolicy(transformedFormValue);
      } else {
        this.toasterService.showError(
          this.languageService.transalte('messages.error'),
          this.languageService.transalte('messages.duplicateItem')
        );
      }
    } else {
      this.toasterService.showError(
        this.languageService.transalte('messages.error'),
        this.languageService.transalte('messages.noItemsToAdd')
      );
    }
  }


  cancel() {
    this.router.navigateTo('/masterdata/price-policy');
  }

  applyFilterGlobal(event: any, stringVal: string) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.dt.filterGlobal(inputElement.value, stringVal);
    }
  }

  getExcel() {
    const ref = this.dialog.open(PopupExcelComponent, {
      width: '600px',
      height: '450px',
    });

    ref.onClose.subscribe((selectedItems: any[]) => {
      if (selectedItems) {

        // Helper function to compare two objects for equality
        const areObjectsEqual = (obj1: any, obj2: any): boolean => {
          return Object.keys(obj1).every(key => obj1[key] === obj2[key]) &&
            Object.keys(obj2).every(key => obj1[key] === obj2[key]);
        };

        // Loop through selectedItems to find duplicates
        const duplicates: any[] = [];
        for (let i = 0; i < selectedItems.length; i++) {
          for (let j = i + 1; j < selectedItems.length; j++) {
            if (areObjectsEqual(selectedItems[i], selectedItems[j])) {
              duplicates.push(selectedItems[i]);
            }
          }
        }

        // Proceed if there are no duplicates
        if (duplicates.length === 0) {

          const policyItemsList = selectedItems.map((item: any) => ({
            itemCode: item.itemCode,
            uomCode: item.uomCode,
            itemVariantCode: item.itemVariantCode,
            price: item.price,
            taxId: item.taxId

          }));

          this.salesService.validateExcel({ policyItemsList });

          this.salesService.listOfExcelObser.subscribe((res: any) => {
            const rowLength: number = this.pricePolicyFormArray.value.length

            res.forEach((element: any, index: number) => {
              this.addNewRow();
              this.setExcelData(index + rowLength, element.itemId, element);
            });
          });
        } else {
          this.toasterService.showError(
            this.languageService.transalte('messages.error'),
            this.languageService.transalte('messages.duplicateItem')
          );
        }
      }
    });
  }
  ngOnDestroy(): void {
    localStorage.removeItem('selectedPricePolicyId');
  }

  constructor(
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private dialog: DialogService,
    private salesService: SalesService,
    private languageService: LanguageService,
    private toasterService: ToasterService,
    private router: RouterService,
  ) { }
}
