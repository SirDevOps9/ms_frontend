import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { customValidators, FormsService, PageInfo } from 'shared-lib';
import * as XLSX from 'xlsx';
import { MultiSelectItemsComponent } from '../../../components/multi-select-items/multi-select-items.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ItemDto } from '../../../models';
import { SalesService } from '../../../sales.service';

@Component({
  selector: 'app-add-price-policy',
  templateUrl: './add-price-policy.component.html',
  styleUrl: './add-price-policy.component.scss'
})
export class AddPricePolicyComponent implements OnInit {
  rowDataMap: { [key: number]: { uomOptions: any[] } } = {};

  data:any;
  listOfExcel: any[]=[];
  items: ItemDto[]=[];

  addForm: FormGroup;
  ngOnInit() {
    this.subscribes()
    this.initItemsData()
    this.initializeForm()
  }
  initializeForm() {
    this.addForm = this.formBuilder.group({

      code: new FormControl(''),
      name: new FormControl('' ,[customValidators.required, customValidators.length(1,100)]),
      uploadPolicy: new FormControl(''),
      fromPolicy: new FormControl(''),
      item: new FormControl(''),
      itemCategory: new FormControl(''),
      value: new FormControl(''),
      valueType: new FormControl(''),
      VAT: new FormControl(''),
      applyDate: new FormControl(''),
      date: new FormControl(''),
      valueSelect:new FormControl(''),
      pricePolicyDetails: this.formBuilder.array([]),
  
    });

  }
  get pricePolicyFormArray() {
    return this.addForm.get('pricePolicyDetails') as FormArray;
  }
  addNewRow() {
    
    if (!this.formsService.validForm(this.pricePolicyFormArray, false) ) return;

  
  let newLine = this.formBuilder.group(
    {
      itemId: new FormControl('',[customValidators.required]),
      itemName: new FormControl(''),
      isVatApplied: new FormControl(''),
      uomId: new FormControl(''),
      uomName: new FormControl(''),
      itemVariantId: new FormControl(''),
      itemVariantName: new FormControl(''),
      price: new FormControl('',[customValidators.required]),
      priceWithVat: new FormControl(''),
      taxId: new FormControl(''),
      uomOptions:new FormControl(''),

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
  console.log(selectedItem,"0000000000");

  if (selectedItem) {
    console.log(selectedItem,"selectedItem");
    
    const uomOptions:any = selectedItem.itemsUOM
    // .map((uom:any) => ({
    //   id: uom.uomId,
    //   name: uom.uomNameEn, // Use uomNameAr if needed for Arabic
    // }));
    console.log(uomOptions,"uomOptions");

    // Set the UOM options for the corresponding row
    const rowForm = this.pricePolicyFormArray.at(rowIndex) as FormGroup;
    rowForm.get('uomOptions') ?.setValue( uomOptions); // Store options for template access
console.log(rowForm.get('uomOptions')?.value ,"dddddddddd");

    rowForm.get('uomId')?.reset(); // Reset the UOM value to avoid conflicts
    rowForm.get('uomId')?.setValue(selectedItem.uomId); // Optionally set the first UOM
    rowForm.get('uomName')?.setValue(selectedItem.uomNameAr); // Optionally set the first UOM
    rowForm.get('itemName')?.setValue(selectedItem.itemName); // Optionally set the first UOM
    rowForm.get('itemVariantId')?.setValue(selectedItem.itemVariantName); // Optionally set the first UOM
    rowForm.get('itemVariantName')?.setValue(selectedItem.itemVariantName); // Optionally set the first UOM
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
test2(e:any){
console.log(e ,"kkkkkk");

}
  test(){

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
        console.log(this.items , "items");
        
      },
    });

   
  }
  /////////////////////////////
  onclick(data:any) {
    console.log(data ,"00000000000");

    const keys = ['code', 'name', 'uom', 'varient', 'price', 'VAT'];

    const result = data.slice(1).map((arr:any) => {
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
        price: new FormControl(ele.price, [customValidators.required]),
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
      width: '900px',
      height: '600px',
    });
    ref.onClose.subscribe((selectedItems: ItemDto[]) => {
      if (selectedItems) {
        const selectedIds = selectedItems.map(item => item.itemId);
        console.log("onClose",selectedIds)
        //this.reportTrialForm.get('Accounts')?.setValue(selectedIds);
      }
    });
  }
  constructor(
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private dialog: DialogService,
    private salesService: SalesService

  ){}
}
