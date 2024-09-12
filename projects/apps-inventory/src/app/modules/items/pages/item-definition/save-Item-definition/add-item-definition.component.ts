import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { customValidators, FormsService, RouterService, SharedLibraryEnums, ToasterService } from 'shared-lib';
import { AddVariantPopupComponent } from '../../../components/add-variant-popup/add-variant-popup.component';
import { ViewVariantPopupComponent } from '../../../components/view-variant-popup/view-variant-popup.component';
import { AddBarcodePopupComponent } from '../../../components/add-barcode-popup/add-barcode-popup.component';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../../items.service';
import { ViewQRcodeComponent } from '../../../components/view-qrcode/view-qrcode.component';
import { UomCodeLookup, UomDefault } from '../../../models';
import { AddUom } from '../../../models/addUom';

@Component({
  selector: 'app-add-item-definition',
  templateUrl: './add-item-definition.component.html',
  styleUrl: './add-item-definition.component.scss'
})
export class AddItemDefinitionComponent implements OnInit {

  itemDefinitionForm : FormGroup = new FormGroup({})
  id : number
  uomLookup : { id: number; name: string }[] = []
  colors = [
    { label: 'Red', value: '#FF0000', icon: 'pi pi-circle' },
    { label: 'Green', value: '#008000', icon: 'pi pi-circle' },
    { label: 'Blue', value: '#0000FF', icon: 'pi pi-circle' },
    { label: 'Yellow', value: '#FFFF00', icon: 'pi pi-circle' },
    { label: 'Orange', value: '#FFA500', icon: 'pi pi-circle' },
    { label: 'Purple', value: '#800080', icon: 'pi pi-circle' },
    { label: 'Cyan', value: '#00FFFF', icon: 'pi pi-circle' },
    { label: 'Magenta', value: '#FF00FF', icon: 'pi pi-circle' },
    { label: 'Lime', value: '#00FF00', icon: 'pi pi-circle' },
    { label: 'Pink', value: '#FFC0CB', icon: 'pi pi-circle' },
    { label: 'Teal', value: '#008080', icon: 'pi pi-circle' },
    { label: 'Lavender', value: '#E6E6FA', icon: 'pi pi-circle' },
    { label: 'Brown', value: '#A52A2A', icon: 'pi pi-circle' },
    { label: 'Beige', value: '#F5F5DC', icon: 'pi pi-circle' },
    { label: 'Maroon', value: '#800000', icon: 'pi pi-circle' },
    { label: 'Mint', value: '#98FF98', icon: 'pi pi-circle' },
    { label: 'Olive', value: '#808000', icon: 'pi pi-circle' },
    { label: 'Coral', value: '#FF7F50', icon: 'pi pi-circle' },
    { label: 'Navy', value: '#000080', icon: 'pi pi-circle' },
    { label: 'Grey', value: '#808080', icon: 'pi pi-circle' },
    { label: 'White', value: '#FFFFFF', icon: 'pi pi-circle' },
    { label: 'Black', value: '#000000', icon: 'pi pi-circle' },
    { label: 'Violet', value: '#EE82EE', icon: 'pi pi-circle' },
    { label: 'Indigo', value: '#4B0082', icon: 'pi pi-circle' },
    { label: 'Gold', value: '#FFD700', icon: 'pi pi-circle' },
    { label: 'Silver', value: '#C0C0C0', icon: 'pi pi-circle' },
    { label: 'Charcoal', value: '#36454F', icon: 'pi pi-circle' },
    { label: 'Peach', value: '#FFE5B4', icon: 'pi pi-circle' },
    { label: 'Salmon', value: '#FA8072', icon: 'pi pi-circle' },
    { label: 'Chocolate', value: '#D2691E', icon: 'pi pi-circle' },
    { label: 'Tomato', value: '#FF6347', icon: 'pi pi-circle' },
    { label: 'Khaki', value: '#F0E68C', icon: 'pi pi-circle' },
    { label: 'Turquoise', value: '#40E0D0', icon: 'pi pi-circle' },
    { label: 'Plum', value: '#DDA0DD', icon: 'pi pi-circle' },
    { label: 'Crimson', value: '#DC143C', icon: 'pi pi-circle' },
    { label: 'Sienna', value: '#A0522D', icon: 'pi pi-circle' },
    { label: 'Orchid', value: '#DA70D6', icon: 'pi pi-circle' },
    { label: 'Azure', value: '#F0FFFF', icon: 'pi pi-circle' },
    { label: 'Ivory', value: '#FFFFF0', icon: 'pi pi-circle' },
    { label: 'Rust', value: '#B7410E', icon: 'pi pi-circle' },
    { label: 'Fuchsia', value: '#FF00FF', icon: 'pi pi-circle' },
    { label: 'Ruby', value: '#E0115F', icon: 'pi pi-circle' },
    { label: 'Amethyst', value: '#9966CC', icon: 'pi pi-circle' },
    { label: 'Pearl', value: '#EAE0C8', icon: 'pi pi-circle' },
    { label: 'Periwinkle', value: '#CCCCFF', icon: 'pi pi-circle' },
    { label: 'Sky Blue', value: '#87CEEB', icon: 'pi pi-circle' },
    { label: 'Mauve', value: '#E0B0FF', icon: 'pi pi-circle' },
    { label: 'Honeydew', value: '#F0FFF0', icon: 'pi pi-circle' },
    { label: 'Azure', value: '#007FFF', icon: 'pi pi-circle' },
  ];
  ItemCategoryDropDown : { id: number; name: string }[] = []
  tagDropDropDownLookup : { id: number; name: string }[] = []
  AccountsDropDownLookup : { id: number; nameAr: string; nameEn: string }[] =  []
  taxesDropDropDownLookup : { id: number; nameAr: string; nameEn: string }[] = []
  trackingTrackingLookup : { id: number; name: string }[] = []
  uomCodeLookup : UomCodeLookup[] = []
  UOMCategoryDropDown : { id: number; name: string}[] = []

  ItemVariantsByItemIdDropDown : { id: number; nameEn: string }[] = []
  constructor(private _router : RouterService,private fb : FormBuilder , private formService : FormsService ,  public sharedLibEnums: SharedLibraryEnums,private dialog : DialogService , private route : ActivatedRoute , private toaserService : ToasterService , private itemService : ItemsService){
    this.id = this.route.snapshot.params['id']
  }
  ngOnInit(): void {
    this.itemDefinitionForm = this.fb.group({
      id : this.id,
      code : [''],
      name : [''],
      photo : [''],
      categoryId : [''],
      countryName : [''],
      tags : [''],
      defaultUOMCategoryId : [''],
      taxId : [''],
      shortName : [''],
      warranty : [''],
      isVatApplied : [''],
      specialCare : [''],
      lifeTime : [''],
      color : [''],
      uomId : [''],
      uom : this.fb.array([]),
      barcode : this.fb.array([]),
      attribute : this.fb.array([]),
      hasExpiryDate : [''],
      trackingId : [''],
      itemAccounting : this.fb.group({
        pAccount: 0,
        prAccount: 0,
        sAccount: 0,
        srAccount: 0
      })
    })

    // this.addLine() 
    this.getBarcodeByItemId()
     this.getUOMByItemId()
    this.itemService.getAttributeVariantById(this.id)
    this.addLineBarcode()
    this.itemService.sendAttributeVariantDataObs.subscribe(res=>{
      if(res) {
        this.AttributeForm.clear()
        res.forEach(element => {
          let data = this.fb.group({
            name: element.attributeGroupNameEn,
            attributeGroupId : element.attributeGroupId,
            status: element.isActive,
            itemId:element.itemId,
            id : element.id
            
          })
          this.AttributeForm.push(data)
        });
      }
    })
    this.getItemVariantsByItemIdDropDown()

    this.itemService.sendBarcode.subscribe(res=>{
      this.getBarcodeByItemId()
    })
    this.itemService.sendUOMObs.subscribe(res=>{
      this.getUOMByItemId()
    })

    this.ItemCategoryDropDownData()
    this.tagDropDropDown()
    this.taxesDropDropDown()
    this.UOMCategoryDropDownData()
    this.AccountsDropDown()
    this. getTrackingDropDown()
    this.itemService.sendDefaultObs.subscribe(res=>{
      if(res){
        this.getUOMByItemId()
      }
    })

    this.itemService.editItemDataObs.subscribe(res=>{
      if(res){

      }
    })
 
    this.itemService.getItemById(this.id)
    this.itemService.GetItemByIDObs.subscribe(res=>{
        this.itemDefinitionForm.patchValue({...res})

      if(res.uomId) {
        this.getUomDropDown(res.uomId)
        this.uomCodeDropDown(res.uomId)

      }
      
    
    })
  }

 

  get UOMForm() {
    return this.itemDefinitionForm.get('uom') as FormArray
  }
  get barcodeForm() {
    return this.itemDefinitionForm.get('barcode') as FormArray
  }
  get AttributeForm() {
    return this.itemDefinitionForm.get('attribute') as FormArray
  }

  getUomDropDown(id : number) {
    this.itemService.getUomDropDownByUomCategory(id)
    this.itemService.UOMDropDownLookupByUomCategoryObs.subscribe(res=>{
      this.uomLookup = res
    })
  }
  UOMCategoryDropDownData() {
    this.itemService.UOMCategoryDropDown()
    this.itemService.UOMCategoryDropDownLookup.subscribe(res=>{
      this.UOMCategoryDropDown = res 
    })
  }
  getItemVariantsByItemIdDropDown() {
    this.itemService.getItemVariantsByItemIdDropDown(this.id)
    this.itemService.ItemVariantsByItemIdDropDownObs.subscribe(res=>{
      this.ItemVariantsByItemIdDropDown = res
    })
  }

  ItemCategoryDropDownData() {
    this.itemService.ItemCategoryDropDown()
    this.itemService.itemCategoryLookupObs.subscribe(res=>{
      this.ItemCategoryDropDown = res
    })
  }
  // end point
  tagDropDropDown() {
    this.itemService.tagDropDown()
    this.itemService.tagLookupObs.subscribe(res=>{
      this.tagDropDropDownLookup = res
    })
  }
  AccountsDropDown() {
    this.itemService.AccountsDropDown()
    this.itemService.AccountsDropDownLookupObs.subscribe(res=>{
      this.AccountsDropDownLookup = res
    })
  }

  uomCategoryChanged(e : any) {
    this.uomCodeDropDown(e)
    this.getUomDropDown(e)
  }
  uomCodeLookupChanged(e:any , itemDefitionForm : FormGroup) {
    this.getCodeByuomCodeDropDown(e  , itemDefitionForm)
    let data : any=  this.uomCodeLookup.find((elem : any)=>elem.id == e)

    itemDefitionForm.controls['uomNameEn'].setValue(data?.name)

  }
  // end point
  taxesDropDropDown() {
    this.itemService.taxesDropDropDown()
    this.itemService.taxesLookupObs.subscribe(res=>{
      this.taxesDropDropDownLookup = res
    })
  }
  uomCodeDropDown(id:number) {
    this.itemService.uomCodeDropDown(id)
    this.itemService.uomCodeLookupObs.subscribe(res=>{
      this.uomCodeLookup = res
    })
  }
  getCodeByuomCodeDropDown(id:number  , itemDefitionForm: FormGroup) {
    this.itemService.getCodeByuomCodeDropDown(id)
    this.itemService.codeByuomCodeDropDownObs.subscribe(res=>{
      itemDefitionForm.controls['uomCode'].setValue(res?.code)
    })
  }
  getTrackingDropDown() {
    this.itemService.getTrackingDropDown()
    this.itemService.trackingTrackingDropDownObs.subscribe(res=>{
    this.trackingTrackingLookup = res
    })
  }

  createUomFormGroup(): FormGroup {
    return this.fb.group({
      id:0,
      itemId: this.id,
      uomId: [null ],
      uomCode : null,
      conversionRatio: 1,
      isDefault: true,
      isSales: true,
      isPurchase: true,
      uomNameEn : null
    });
  }
  createbarcodeFormGroup(): FormGroup {
    return this.fb.group({
      id : null ,
      barcode: null,
      uomId: null,
      itemVariantId: null,
      sku: null,
      status: true, 
      uomName : null,
      itemVariantName : null
    });
  }
  createAttributeFormGroup(res:any): FormGroup {
    return this.fb.group({
      name: res,
      attributeGroupId : 0,
      status: true,
      itemId : null,
      id : null

    });
  }

  addLine() {
    this.UOMForm.push(this.createUomFormGroup());
  }
  addLineBarcode() {

    // const dialogRef = this.dialog.open(AddBarcodePopupComponent, {
    
    //   width: '50%',
    //   height : '450px'
  
    // });
  
    // dialogRef.onClose.subscribe((res) => {
    //   this.barcodeForm.push(this.createbarcodeFormGroup());
    // });
    this.barcodeForm.push(this.createbarcodeFormGroup());
  }
  addLineAttribute() {
  
    const dialogRef = this.dialog.open(AddVariantPopupComponent, {
    
      width: '50%',
      height : '430px',
      data : this.id
  
    });

    dialogRef.onClose.subscribe((res) => {
      if(res) {
        this.AttributeForm.push(this.createAttributeFormGroup(res))
        this.itemService.getAttributeVariantById(this.id)

      }
    });
  }

  onDelete(i: number) {
    this.UOMForm.removeAt(i);
  }
  onDeleteBarcode(i: number) {
    this.barcodeForm.removeAt(i);
  }
  onDeleteAttribute(itemDefAttributeGroup:FormGroup) {
    this.itemService.deleteVariant(itemDefAttributeGroup.get('id')?.value)
  }


  async confirmChange(event: any, itemDefAttributeGroup : FormGroup) {
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
  async confirmBarcodeChange(event: any, itemBarcodeGroup : FormGroup) {
    const confirmed = await this.toaserService.showConfirm('ConfirmButtonTexttochangestatus');
    if (confirmed) {
      const command = {
        id: itemBarcodeGroup.get('itemVariantId')?.value,
        status : itemBarcodeGroup.get('status')?.value
       
      };
      this.itemService.ActivateBarcode(command);
   
    } else {
      // Properly toggle the status value
      const currentStatus = itemBarcodeGroup.get('status')?.value;
      itemBarcodeGroup.get('status')?.setValue(!currentStatus);
    }
    
  }

  onViewAttribute(form : FormGroup) {
    const dialogRef = this.dialog.open(ViewVariantPopupComponent, {
    
      width: '50%',
      height : '450px',

      data : form.get('id')?.value

  
    });
  
    dialogRef.onClose.subscribe((res) => {
   
    });
  }
 
  onSaveBarcode(itemDefBarcodeGroup : FormGroup){
    let {barcode , sku,itemVariantId,uomId} = itemDefBarcodeGroup.value
    return this.itemService.addBarcode({barcode , sku,itemVariantId,uomId})
  }

  getBarcodeByItemId(){
     this.itemService.getBarcodeByItemId(this.id)
     this.itemService.GetBarcodeObs.subscribe(res=>{
      if(res) {
        this.barcodeForm.clear()      

        res.forEach(element => {
          let data = this.fb.group({
            barcode: element.barcode,
            uomId: element.uomId,
            itemVariantId: element.itemVariantId,
            sku: element.sku,
            status: element.isActive, 
            uomName : element.uomName,
            itemVariantName : element.itemVariantName
          })
          this.barcodeForm.push(data)
        });
      }
    
     })

  }

  variantChange(e : any , itemDefBarcodeGroup : FormGroup) {
    let data : any = this.ItemVariantsByItemIdDropDown.find(elem=>elem.id == e)
    itemDefBarcodeGroup.get('itemVariantName')?.setValue(data.name)
  }
  getUOMByItemId(){
     this.itemService.getUomByItemId(this.id)
     this.itemService.GetUomListByItemIdObs.subscribe(res=>{
      if(res.length) {
        this.UOMForm.clear()      
    

        res.forEach(element => {
          let data = this.fb.group({
            id : element.id,
            itemId: element.itemId,
            uomId: element.uomId,
            uomCode : null,
            uomNameEn : element.uomNameEn,
            conversionRatio: element.isDefault ? 1 : null,
            isDefault: element.isDefault,
            isSales: element.isSales,
            isPurchase: element.isPurchase
          })
          this.getCodeByuomCodeDropDown(element.uomId  , data)
          this.UOMForm.push(data)
        });
      }
 
     })

  }

  onViewBarcode(itemDefBarcodeGroup : FormGroup) {
    const dialogRef = this.dialog.open(ViewVariantPopupComponent, {
    
      width: '50%',
      height : '450px',

      data : itemDefBarcodeGroup.get('itemVariantId')?.value

  
    });
  }
  files(data:any) {
    // this.filesData = data
  }

  openBarcode(barcode:string) {
    const dialogRef = this.dialog.open(AddBarcodePopupComponent, {
    
      width: '50%',
      height : '330px',

      data : barcode

  
    });
  }
  addUOM(itemDefGroup : FormGroup) {

    if (!this.formService.validForm(this.UOMForm, false)) return;

    let data : AddUom = {
      id: itemDefGroup.get('id')?.value,
      itemId: itemDefGroup.get('itemId')?.value,
      uomId: itemDefGroup.get('uomId')?.value,
      conversionRatio: itemDefGroup.get('conversionRatio')?.value,
      isDefault: itemDefGroup.get('isDefault')?.value,
      isSales: itemDefGroup.get('isSales')?.value,
      isPurchase: itemDefGroup.get('isPurchase')?.value,
    }
     this.itemService.addUOM(data)
     
  }
  openQRcode(barcode:string) {
    const dialogRef = this.dialog.open(ViewQRcodeComponent, {
    
      width: '50%',
      height : '440px',

      data : barcode

  
    });
  }

 async defualtChanged(e:any , itemDefinition : FormGroup) {
    const confirmed = await this.toaserService.showConfirm('ConfirmButtonTexttochangestatus');
    if (confirmed) {
      let obj : UomDefault = {
        isDefault: e,
        itemId: +this.id,
        uomId: itemDefinition.get('uomId')?.value
      }
      this.itemService.setUomDefault(obj)
   
    } else {
      // Properly toggle the status value
      const currentStatus = itemDefinition.get('isDefault')?.value;
      itemDefinition.get('isDefault')?.setValue(!currentStatus);
    }
  
   
  }

  generateVariant() {
    this.itemService.generateVariant({itemId:this.id})
  }

  onSave() {

    const {
      id,
      code,
      name,
      shortName,
      warranty,
      isVatApplied,
      color,
      specialCare,
      countryName,
      categoryId,
      photo,
      trackingId,
      hasExpiryDate,
      lifeTime,
      tags,
      taxId,
      itemAccounting
    } = this.itemDefinitionForm.value;
   let itemData = {
    id,
    code,
    name,
    shortName,
    warranty,
    isVatApplied,
    color,
    specialCare,
    countryName,
    categoryId,
    photo,
    trackingId,
    hasExpiryDate,
    lifeTime,
    tags,
    taxId,
    itemAccounting
    
  }
  // itemData.warranty = Number(itemData.warranty)
   itemData.tags = itemData.tags ? itemData.tags : []
     this.itemService.editItem(itemData)
  }

  onCancel() {
    this._router.navigateTo(`/masterdata/item-definition` )

  }
}