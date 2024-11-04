
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { customValidators, FormsService, RouterService, SharedLibraryEnums, ToasterService } from 'shared-lib';
import { AddVariantPopupComponent } from '../../../components/add-variant-popup/add-variant-popup.component';
import { ViewVariantPopupComponent } from '../../../components/view-variant-popup/view-variant-popup.component';
import { AddBarcodePopupComponent } from '../../../components/add-barcode-popup/add-barcode-popup.component';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../../items.service';
import { ViewQRcodeComponent } from '../../../components/view-qrcode/view-qrcode.component';
import { addBarcode, GetItemById, getUomByItemId, UomCodeLookup, UomDefault } from '../../../models';
import { AddUom, ItemUom } from '../../../models/addUom';


@Component({
  selector: 'app-item-definition-barcode',
  templateUrl: './item-definition-barcode.component.html',
  styleUrl: './item-definition-barcode.component.scss'
})
export class ItemDefinitionBarcodeComponent {


  itemDefinitionForm: FormGroup = new FormGroup({})
  id: number
  uomLookup: { uomId: number; uomName: string }[] = []


  clonedUomCodeLookup: UomCodeLookup[] = []
  itemData: GetItemById
  codeData: { code: number; conversionRatio: string }

  ItemVariantsByItemIdDropDown: { id: number; nameEn: string }[] = []
  constructor(private _router: RouterService, private fb: FormBuilder, private formService: FormsService, public sharedLibEnums: SharedLibraryEnums, private dialog: DialogService, private route: ActivatedRoute, private toaserService: ToasterService, private itemService: ItemsService) {
    this.id = this.route.snapshot.params['id']
  }
  ngOnInit(): void {
    this.getItemVariantsByItemIdDropDown()
    this.itemDefinitionForm = this.fb.group({
      id: this.id,
    
      barcode: this.fb.array([]),
      attribute: this.fb.array([]),
     
    })







    this.addLineBarcode()
 

    this.itemService.sendBarcode.subscribe(res => {
      if (res) {
        this.getBarcodeByItemId()
      }
    })
    this.itemService.sendUOMObs.subscribe(res => {
      console.log("heey", res)


      this.getUomDropDown(this.id)
    })




    this.itemService.editItemDataObs.subscribe(res => {
      if (res) {

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

  getUomDropDown(id: number) {
    this.itemService.getUomDropDownByUomItemId(id)
    this.itemService.UOMDropDownLookupByItemIdObs.subscribe(res => {
      console.log(res)
      this.uomLookup = res
    })
  }


  getItemVariantsByItemIdDropDown() {
    this.itemService.getItemVariantsByItemIdDropDown(this.id)
    this.itemService.ItemVariantsByItemIdDropDownObs.subscribe((data) => {
      this.ItemVariantsByItemIdDropDown = data

    })
  }




  uomChange(e: any, itemDefBarcodeGroup: FormGroup) {

    let data = this.uomLookup.find(elem => elem.uomId == e)
 

    itemDefBarcodeGroup.get('uomName')?.setValue(data?.uomName)
  }






  createbarcodeFormGroup(): FormGroup {
    return this.fb.group({
      id: null,
      itemId : this.id,
      barcode: null,
      uomId: [null, [customValidators.required]],
      itemVariantId: null,
      sku: null,
      isActive: true,
      uomName: null,
      itemVariantName: null
    });
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


  onDelete(i: number) {
    this.UOMForm.removeAt(i);
  };
  onDeleteBarcode(itemDefBarcodeGroup: FormGroup, i: number) {
    if (itemDefBarcodeGroup.get('id')?.value) {
      this.itemService.deleteBarcode(itemDefBarcodeGroup.get('id')?.value)
    } else {
      this.barcodeForm.removeAt(i)
    }

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

      data: form.get('id')?.value


    });

    dialogRef.onClose.subscribe((res) => {

    });
  }

  onSaveBarcode() {
    if (!this.formService.validForm(this.barcodeForm, false)) return;

    let data: addBarcode= {
      id : this.id,
      barcodes : this.barcodeForm.value 
    } 

    return this.itemService.addBarcode(data)
  }

  getBarcodeByItemId() {
    this.itemService.getItemBarcodeById(this.id)
    this.itemService.dataBarCodeByIdObs.subscribe(res => {
      if (res) {
        this.barcodeForm.clear()

        res.forEach(element => {
          let data = this.fb.group({
            id: element.id,
            itemId : this.id,
            barcode: element.barcode,
            uomId: element.uomId,
            itemVariantId: element.itemVariantId,
            sku: element.sku,
            isActive: element.isActive,
            uomName: element.uomName,
            itemVariantName: element.itemVariantName
          })
          this.barcodeForm.push(data)
        });
      }

    })

  }




  onViewBarcode(itemDefBarcodeGroup: FormGroup) {
    const dialogRef = this.dialog.open(ViewVariantPopupComponent, {

      width: '50%',
      height: '450px',

      data: itemDefBarcodeGroup.get('itemVariantId')?.value


    });
  }
  files(data: any) {
    // this.filesData = data
  }

  openBarcode(barcode: string) {
    const dialogRef = this.dialog.open(AddBarcodePopupComponent, {

      width: '50%',
      height: '330px',

      data: barcode


    });
  }

  openQRcode(barcode: string) {
    const dialogRef = this.dialog.open(ViewQRcodeComponent, {

      width: '50%',
      height: '440px',

      data: barcode


    });
  }

  async defualtChanged(e: any, itemDefinition: FormGroup) {
    // const defaultUom = this.uomCodeLookup.find((elem) => elem.isDefault);


    let conversionRatioTemp = itemDefinition.get('tempConversionRatio')?.value;

    console.log(conversionRatioTemp)
    console.log(itemDefinition.get('conversionRatio')?.value)
    console.log(e)



    if (e == true) {
      itemDefinition.get('conversionRatio')?.setValue(1);
    } else {

      itemDefinition.get('conversionRatio')?.setValue(conversionRatioTemp);
    }

  }


  generateVariant() {
    this.itemService.generateVariant({ itemId: this.id })
  }



  onSave() {
    if (!this.formService.validForm(this.itemDefinitionForm, false)) return;

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
      countryId,
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
      countryId,
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
    this._router.navigateTo(`/masterdata/item-definition`)

  }


}
