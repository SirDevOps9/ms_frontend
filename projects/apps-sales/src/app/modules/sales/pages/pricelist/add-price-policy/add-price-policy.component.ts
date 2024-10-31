import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { customValidators, FormsService, LanguageService, RouterService, ToasterService } from 'shared-lib';
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
  duplicateLine:boolean;
  data: any;
  rowDuplicate: number;
  listOfExcel: any[] = [];
  items: ItemDto[] = [];
  filteredPricePolicies:any;

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
if(!this.duplicateLine){
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
        price: new FormControl( Number( ), [customValidators.required , customValidators.nonZero]),
        priceWithVat: new FormControl(0),
        taxId: new FormControl(''),
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
    this.filteredPricePolicies=this.pricePolicyFormArray
  }else{
    this.toasterService.showError(
      this.languageService.transalte('messages.error'),
      this.languageService.transalte('messages.duplicateItem')
    );
  }
  }

//   setRowData(rowIndex: number, selectedItemId: number) {
//     const selectedItem = this.items.find(item => item.id === selectedItemId);
//     console.log(  selectedItem, "0000000000");

//     if (selectedItem) {

//       const uomOptions: any = selectedItem.itemsUOM
    
//       console.log(uomOptions, "uomOptions");
//       const rowForm = this.pricePolicyFormArray.at(rowIndex) as FormGroup;
//       rowForm.get('uomOptions')?.setValue(uomOptions); // Store options for template access
//       rowForm.get('uomId')?.reset(); // Reset the UOM value to avoid conflicts
//       rowForm.get('uomId')?.setValue(selectedItem.uomId); // Optionally set the first UOM
//       rowForm.get('uomName')?.setValue(selectedItem.uomNameAr); // Optionally set the first UOM
//       rowForm.get('itemName')?.setValue(selectedItem.itemName); // Optionally set the first UOM
//       rowForm.get('itemVariantId')?.setValue(selectedItem.itemVariantId); // Optionally set the first UOM
//       rowForm.get('itemVariantName')?.setValue(selectedItem.itemVariantName); // Optionally set the first UOM
//       rowForm.get('itemId')?.setValue(selectedItem.itemId)
//       rowForm.get('itemCode')?.setValue(selectedItem.itemCode)
//       rowForm.get('taxId')?.setValue(selectedItem.taxId)
//       rowForm.get('taxRatio')?.setValue(selectedItem.taxRatio)
//       ///
//       rowForm.get('itemCategoryNameAr')?.setValue(selectedItem.itemCategoryNameAr)
//       rowForm.get('itemCategoryNameEn')?.setValue(selectedItem.itemCategoryNameEn)
//       rowForm.get('hasExpiryDate')?.setValue(selectedItem.hasExpiryDate)
//       rowForm.get('uomNameAr')?.setValue(selectedItem.uomNameAr)
//       rowForm.get('uomNameEn')?.setValue(selectedItem.uomNameEn)
//       rowForm.get('categoryType')?.setValue(selectedItem.categoryType)
//       rowForm.get('id')?.setValue(selectedItem.id)
    
//       const isDuplicate = this.pricePolicyFormArray.controls.some((element: any, index: number) => {
//         if (index !== rowIndex) {
//           const { uomId, itemId, itemVariantId } = element.value;
//           const rowUomId = rowForm.get('uomId')?.value;
//           const rowItemId = rowForm.get('itemId')?.value;
//           const rowItemVariantId = rowForm.get('itemVariantId')?.value;
      
//           if (uomId === rowUomId && itemId === rowItemId && itemVariantId === rowItemVariantId) {
//             this.toasterService.showError(
//               this.languageService.transalte('messages.error'),
//               this.languageService.transalte('messages.duplicateItem')
//             );
//             this.rowDuplicate= rowIndex
//             this.duplicateLine=true
//             return true; // يوقف التكرار عند أول تطابق
//           }
//           this.duplicateLine=false

//           return false;
//         }
//         this.duplicateLine=false

//         return false;
//       });
      
//     }else{
// // Clear the row if selectedItem is not found
// rowForm.reset(); // Reset all fields in the row to their initial state
// // You may also want to set specific default values for certain fields
// rowForm.get('uomOptions')?.setValue([]); // Set UOM options to empty if needed
// // Reset any additional fields here if necessary
// console.log("Selected item not found, row cleared");
//     }
  
    
//   }
setRowData(rowIndex: number, selectedItemId: number) {
  const selectedItem = this.items.find(item => item.id === selectedItemId);
  console.log(selectedItem, "0000000000");

  const rowForm = this.pricePolicyFormArray.at(rowIndex) as FormGroup;

  if (selectedItem) {
    const uomOptions: any = selectedItem.itemsUOM;
    console.log(uomOptions, "uomOptions");

    // Store options for template access
    rowForm.get('uomOptions')?.setValue(uomOptions); 
    rowForm.get('uomId')?.reset(); // Reset the UOM value to avoid conflicts
    rowForm.get('uomId')?.setValue(selectedItem.uomId); 
    rowForm.get('uomName')?.setValue(selectedItem.uomNameAr); 
    rowForm.get('itemName')?.setValue(selectedItem.itemName); 
    rowForm.get('itemVariantId')?.setValue(selectedItem.itemVariantId); 
    rowForm.get('itemVariantName')?.setValue(selectedItem.itemVariantName); 
    rowForm.get('itemId')?.setValue(selectedItem.itemId);
    rowForm.get('itemCode')?.setValue(selectedItem.itemCode);
    rowForm.get('taxId')?.setValue(selectedItem.taxId);
    rowForm.get('taxRatio')?.setValue(selectedItem.taxRatio);
    
    // Additional fields
    rowForm.get('itemCategoryNameAr')?.setValue(selectedItem.itemCategoryNameAr);
    rowForm.get('itemCategoryNameEn')?.setValue(selectedItem.itemCategoryNameEn);
    rowForm.get('hasExpiryDate')?.setValue(selectedItem.hasExpiryDate);
    rowForm.get('uomNameAr')?.setValue(selectedItem.uomNameAr);
    rowForm.get('uomNameEn')?.setValue(selectedItem.uomNameEn);
    rowForm.get('categoryType')?.setValue(selectedItem.categoryType);
    rowForm.get('id')?.setValue(selectedItem.id);

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
    if ( this.rowDuplicate == rowIndex) {
      console.log(this.duplicateLine , this.rowDuplicate == rowIndex,"uuuuuuuuu");
      
     this.rowDuplicate = 0
 
   
    }
    rowForm.reset(); 
    rowForm.get('uomOptions')?.setValue([]); 
    console.log("Selected item not found, row cleared");
    console.log(this.duplicateLine , this.rowDuplicate  , rowIndex,"vvvvvvvvvv");
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
          this.rowDuplicate= rowIndex
          this.duplicateLine=true
          return true; // يوقف التكرار عند أول تطابق
        }
        this.rowDuplicate=0
        this.duplicateLine=false

        return false;
      }
      return false;
    });
  
  }
}

  setPriceWithVat(index:number , price:any ){
    const rowForm = this.pricePolicyFormArray.at(index) as FormGroup;
    rowForm.get('priceWithVat')?.setValue(0); 
    const taxRatio:any = rowForm.get('taxRatio')?.value
    console.log(taxRatio ,"taxRatiotaxRatio");
    
    let priceWithVat= Number(price) +(Number(price) * taxRatio )
    console.log( Number(price) +(Number(price) * taxRatio ));
    if(rowForm.get('isVatApplied')?.value==true){
      rowForm.get('priceWithVat')?.setValue(priceWithVat);  

    }else{
      rowForm.get('priceWithVat')?.setValue(price);  

    }
  }
  async deleteRow(index:number){
    const confirmed = await this.toasterService.showConfirm('Delete');
    if (confirmed) {
      this.pricePolicyFormArray.removeAt(index);

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
    if(this.pricePolicyFormArray.value.length>0 ){

  
    if(!this.duplicateLine){

    const ref = this.dialog.open(UpdetePricePolicyComponent, {
      width: '1000px',
      height: '600px',
      data: this.pricePolicyFormArray
    });
  
    ref.onClose.subscribe((selectedItems: any) => {
      if (selectedItems) {
        console.log(selectedItems, "selectedItems");
    
        // Iterate over the selected items and update the corresponding rows
        selectedItems.value.forEach((item: any) => {
          const index = this.pricePolicyFormArray.controls.findIndex(
            (control) => control.get('id')?.value === item.id
          );
    
          if (index !== -1) {
            // Update the fields in the relevant row
            this.pricePolicyFormArray.at(index).patchValue(item);
            this.setPriceWithVat(index , item.price)
          }
        });
    
        // Log the updated form array for debugging
        console.log(this.pricePolicyFormArray.value, "Updated Array");
      }
    });
  }else{
    this.toasterService.showError(
      this.languageService.transalte('messages.error'),
      this.languageService.transalte('messages.duplicateItem')
    );
  
  }
}else{
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
              this.rowDuplicate= indexLine
              this.duplicateLine=true
              return true; // يوقف التكرار عند أول تطابق
            }
            this.rowDuplicate=0
            this.duplicateLine=false

            return false;
          }
          return false;
        });
      

  }
  save() {
   
    if(!this.duplicateLine){
      if (!this.formsService.validForm(this.addForm, false)) return;

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
    }else{
      this.toasterService.showError(
        this.languageService.transalte('messages.error'),
        this.languageService.transalte('messages.duplicateItem')
      );
    }
  }
  onSearch(event: any): void {
    const searchValue = (event?.toLowerCase() || '');
    console.log( this.pricePolicyFormArray.value,",,");
    
    this.pricePolicyFormArray.controls = this.pricePolicyFormArray.value.filter((item: any) =>
      item.itemName.toLowerCase().includes(searchValue)
    );
  }
  cancel(){
    this.router.navigateTo('/masterdata/pricelist');

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
