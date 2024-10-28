import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { customValidators, FormsService, LanguageService, PageInfo, ToasterService } from 'shared-lib';
import * as XLSX from 'xlsx';
import { MultiSelectItemsComponent } from '../../../components/multi-select-items/multi-select-items.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ItemDto } from '../../../models';
import { SalesService } from '../../../sales.service';
import { UpdetePricePolicyComponent } from '../../../components/updete-price-policy/updete-price-policy.component';

@Component({
  selector: 'app-add-price-policy',
  templateUrl: './add-price-policy.component.html',
  styleUrl: './add-price-policy.component.scss'
})
export class AddPricePolicyComponent implements OnInit {
  rowDataMap: { [key: number]: { uomOptions: any[] } } = {};

  data: any;
  rowDuplicate: number;
  listOfExcel: any[] = [];
  items: ItemDto[] = [];

  addForm: FormGroup;
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
        price: new FormControl( Number( 0), [customValidators.required]),
        priceWithVat: new FormControl(0),
        taxId: new FormControl(''),
        uomOptions: new FormControl(''),

        ////
        name: new FormControl(''),
        id: new FormControl(0),

      }
    );
    newLine.updateValueAndValidity();
    this.pricePolicyFormArray.push(newLine);

  }

  setRowData(rowIndex: number, selectedItemId: number) {
    const selectedItem = this.items.find(item => item.id === selectedItemId);
    console.log(selectedItem, "0000000000");

    if (selectedItem) {

      const uomOptions: any = selectedItem.itemsUOM
    
      console.log(uomOptions, "uomOptions");
      const rowForm = this.pricePolicyFormArray.at(rowIndex) as FormGroup;
      rowForm.get('uomOptions')?.setValue(uomOptions); // Store options for template access
      rowForm.get('uomId')?.reset(); // Reset the UOM value to avoid conflicts
      rowForm.get('uomId')?.setValue(selectedItem.uomId); // Optionally set the first UOM
      rowForm.get('uomName')?.setValue(selectedItem.uomNameAr); // Optionally set the first UOM
      rowForm.get('itemName')?.setValue(selectedItem.itemName); // Optionally set the first UOM
      rowForm.get('itemVariantId')?.setValue(selectedItem.itemVariantId); // Optionally set the first UOM
      rowForm.get('itemVariantName')?.setValue(selectedItem.itemVariantName); // Optionally set the first UOM
      rowForm.get('itemId')?.setValue(selectedItem.itemId)
      rowForm.get('itemCode')?.setValue(selectedItem.itemCode)
      rowForm.get('taxId')?.setValue(selectedItem.taxId)
      // this.pricePolicyFormArray.controls.forEach((element:any , index:number) => {
      //   if(index != rowIndex){

      //     if(element.value.uomId == rowForm.get('uomId')?.value && 
      //     element.value.itemId == rowForm.get('itemId')?.value &&
      //     element.value.itemVariantId == rowForm.get('itemVariantId')?.value
      //   ){
      //     this.toasterService.showError(
      //       this.languageService.transalte('addCustomerDefinition.success'),
      //       this.languageService.transalte('openeingBalance.CustomerAdded')
      //     );
      //     break
      //   }
      //   }
      // });
      const isDuplicate = this.pricePolicyFormArray.controls.some((element: any, index: number) => {
        if (index !== rowIndex) {
          const { uomId, itemId, itemVariantId } = element.value;
          const rowUomId = rowForm.get('uomId')?.value;
          const rowItemId = rowForm.get('itemId')?.value;
          const rowItemVariantId = rowForm.get('itemVariantId')?.value;
      
          if (uomId === rowUomId && itemId === rowItemId && itemVariantId === rowItemVariantId) {
            this.toasterService.showError(
              this.languageService.transalte('addCustomerDefinition.success'),
              this.languageService.transalte('openeingBalance.CustomerAdded')
            );
            this.rowDuplicate= rowIndex
            this.pricePolicyFormArray.markAsDirty(); // أو يمكنك استخدام markAsTouched() إذا كنت تفضل ذلك

            return true; // يوقف التكرار عند أول تطابق
          }
          return false;
        }
        return false;
      });
      
    }
  
    
  }
  

  // setRowData(index:number , event:any){
  //   console.log(index , event ,";;;;;;;;;;;;");
  //   const foundItem = this.items.find(item => item.id === event);

  //   if (foundItem) {
  //     console.log( foundItem ,"jjjjjjjj");
  //     const priceLine = this.items.at(index);


  //   }

  // }
  logValue(event: any) {
    console.log('Value Changed:', event);
    // this.setRowData(rowIndex, event);
  }
  test2(e: any) {
    console.log(e, "kkkkkk");

  }
  test() {

  }
  //////////
  initItemsData() {
    this.salesService.getLatestItems('');
  }
  subscribes() {
    this.salesService.latestItemsList.subscribe({
      next: (res) => {
        // this.items = res;
        this.items = res.map((item, index) => ({
          ...item,    // Spread existing properties from the original item
          id: index + 1 // Add an `id` field starting from 1
        }));
        console.log(this.items, "items");

      },
    });


  }
  /////////////////////////////
  onclick(data: any) {
    console.log(data, "00000000000");

    const keys = ['code', 'name', 'uom', 'varient', 'price', 'VAT'];

    const result = data.slice(1).map((arr: any) => {
      return keys.reduce((obj: any, key, index) => {
        obj[key] = arr[index];
        return obj;
      }, {});
    });

    console.log(result);
    this.listOfExcel = result;
    // this.pricePolicyFormArray.clear();

    this.listOfExcel.forEach((ele: any) => {
      let dataForm = this.formBuilder.group({
        itemId: new FormControl(ele.code, [customValidators.required]),
        name: new FormControl(ele.name),
        uomId: new FormControl(ele.uom),
        itemVariantId: new FormControl(ele.varient),
        price: new FormControl( ele.price, [customValidators.required]),
        isVatApplied: new FormControl(ele.VAT),
        priceWithVat: new FormControl(''), // Assuming this will be calculated or handled elsewhere
        id: new FormControl(0), // Default value, assuming id is 0 for new entries
      });

      // Add the group to the form array
      this.pricePolicyFormArray.push(dataForm);
    });
    // this.pricePolicyFormArray.patchValue(result)
    // console.log(this.pricePolicyFormArray);

  }
  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const fileType = file.name.split('.').pop().toLowerCase();
  //     if (fileType === 'xlsx') {
  //       this.readExcelFile(file);
  //     } else {
  //       console.log('not supported');
  //     }
  //   }
  // }

  // readExcelFile(file: File) {
  //   const reader = new FileReader();
  //   reader.onload = (e: any) => {
  //     const binaryStr = e.target.result;
  //     const workbook = XLSX.read(binaryStr, { type: 'binary' });
  //     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  //     const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  //     const keys = ['code', 'name', 'uom', 'varient', 'price', 'vat'];
  //     this.data = json
  //     // .slice(1).map((arr:any) => {
  //     //   return keys.reduce((obj: any, key, index) => {
  //     //     obj[key] = arr[index];
  //     //     return obj;
  //     //   }, {});
  //     // });
  //     this.onclick()
  //     console.log(json,'this.datathis.data');
  //   };

  //   reader.readAsBinaryString(file);
  //   console.log(reader.readAsBinaryString(file),'this.datathis.data');

  // }

  openDialog(index: number) {
    const ref = this.dialog.open(MultiSelectItemsComponent, {
      width: '1000px',
      height: '600px',
    });
    ref.onClose.subscribe((selectedItems: any) => {
      if (selectedItems) {
        console.log("onClose", selectedItems)
        const uomOptions: any = selectedItems.itemsUOM
    
        console.log(uomOptions, "uomOptions");
  
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
      }
      
    });
  }
  update() {
    const ref = this.dialog.open(UpdetePricePolicyComponent, {
      width: '1000px',
      height: '600px',
      data: this.pricePolicyFormArray
    });
    ref.onClose.subscribe((selectedItems: any) => {
     
      
    });
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
                this.languageService.transalte('addCustomerDefinition.success'),
                this.languageService.transalte('openeingBalance.CustomerAdded')
              );
              this.rowDuplicate= indexLine
              return true; // يوقف التكرار عند أول تطابق
            }
            this.rowDuplicate=0
            return false;
          }
          return false;
        });
      

  }
  save() {
    const transformedFormValue = {
      ...this.addForm.value,
      policyItemsList: this.addForm.value.policyItemsList.map((detail: any) => ({
        price: Number(detail.price),  // Ensure price is a number
        priceWithVat: Number(detail.priceWithVat),  // If applicable
        itemId: detail.itemId,
        uomId: detail.uomId,
        itemVariantId: detail.itemVariantId,
        isVatApplied: detail.isVatApplied , // Ensure it's a boolean
        taxId: detail.taxId,
      })),
    };
  
    console.log(transformedFormValue, "addForm");
    this.salesService.addPricePolicy(transformedFormValue)
    // Proceed with saving the transformed values
  }
  constructor(
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private dialog: DialogService,
    private salesService: SalesService,
    private languageService: LanguageService,
    private toasterService: ToasterService,

  ) { }
}
