import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { LanguageService, RouterService, FormsService, SharedLibraryEnums, ToasterService, customValidators } from 'shared-lib';
import { AddBarcodePopupComponent } from '../../../components/add-barcode-popup/add-barcode-popup.component';
import { ViewQRcodeComponent } from '../../../components/view-qrcode/view-qrcode.component';
import { ViewVariantPopupComponent } from '../../../components/view-variant-popup/view-variant-popup.component';
import { ItemsService } from '../../../items.service';
import { UomCodeLookup, GetItemById, addBarcode} from '../../../models';
import{addFixedCost, FixedCost} from '../../../models/fixedCost'
@Component({
  selector: 'app-item-fixed-cost',
  templateUrl: './item-fixed-cost.component.html',
  styleUrl: './item-fixed-cost.component.scss'
})
export class ItemFixedCostComponent {

  fiexCostItemDefinitionForm: FormGroup = new FormGroup({})
  id: number
  uomLookup: { uomId: number; uomName: string }[] = []
  currentLang = this.languageService.getLang()
  clonedUomCodeLookup: UomCodeLookup[] = []
  itemData: GetItemById
  ItemVariantsByItemIdDropDown: { variantId: number; variantEnName: string ;variantArName : string }[] = []
  constructor(private languageService  :LanguageService , private _router: RouterService, private fb: FormBuilder, private formService: FormsService, public sharedLibEnums: SharedLibraryEnums, private dialog: DialogService, private route: ActivatedRoute, private toaserService: ToasterService, private itemService: ItemsService) {
    this.id = this.route.snapshot.params['id']
  }
  ngOnInit(): void {
    this.fiexCostItemDefinitionForm = this.fb.group({
      itemId: this.id,
      itemFixedCosts: this.fb.array([]),
    })
    this.itemService.ItemVariantsByIdObs.subscribe(res=>{
      if(Object.keys(res)?.length){
          this.getFixedCostByItemId()
      }
    })

    this.getItemVariants()

    this.addLineBarcode()
    this.itemService.sendBarcode.subscribe(res => {
      if (res) {
        this.getFixedCostByItemId()
      }
    })
    this.itemService.sendUOMObs.subscribe(res => {


      this.getUomDropDown(this.id)
    })

    this.itemService.editItemDataObs.subscribe(res => {
      if (res) {

      }
    })

  }
  getItemVariants(){
    this.itemService.getItemVariants(this.id)
    this.itemService.ItemVariantsByIdObs.subscribe((data)=>{
    this.ItemVariantsByItemIdDropDown = data
    })
  }

  get UOMForm() {
    return this.fiexCostItemDefinitionForm.get('uom') as FormArray
  }
  get fixedCostForm() {
    return this.fiexCostItemDefinitionForm.get('itemFixedCosts') as FormArray
  }

  getUomDropDown(id: number) {
    this.itemService.getUomDropDownByUomItemId(id)
    this.itemService.UOMDropDownLookupByItemIdObs.subscribe(res => {
      this.uomLookup = res
    })
  }



  variantChanged(e : any , itemDefBarcodeGroup : FormGroup) {
   let data =  this.ItemVariantsByItemIdDropDown.find(item=>item.variantId == e)


   itemDefBarcodeGroup.get('itemVariantName')?.setValue(this.currentLang == 'en' ? data?.variantEnName : data?.variantArName)
  }


  uomChange(e: any, itemDefBarcodeGroup: FormGroup) {

    let data = this.uomLookup.find(elem => elem.uomId == e)


    itemDefBarcodeGroup.get('uomName')?.setValue(data?.uomName)
  }






  createbarcodeFormGroup(id: number): FormGroup {
    return this.fb.group({
      id:null,
      itemId : this.id,
      uomId: [null, [customValidators.required]],
      itemVariantId: [null, [customValidators.required]],
      fixedCost: [null, [customValidators.required]],
      uomName: null,
      itemVariantName: null
    });
  }



  addLineBarcode() {
    const barcodeArray = this.fixedCostForm;
    const newId = barcodeArray.length + 1;
    barcodeArray.push(this.createbarcodeFormGroup(newId));
  }



  onDelete(i: number) {
    this.UOMForm.removeAt(i);
  };
  onDeleteFixedCost(itemDefBarcodeGroup: FormGroup, i: number) {
    this.fixedCostForm.removeAt(i)

  }


  onSaveFixedCost() {
    if (!this.formService.validForm(this.fixedCostForm, false)) return;

    // const itemFixedCosts = this.fixedCostForm.value.map((cost: FixedCost, index: number) => ({
    //   ...cost,
    //   id: cost.id || (index + 1)
    // }));

    let data: addFixedCost = {
      itemFixedCosts: this.fixedCostForm.value,
      itemId: this.id
    };

    return this.itemService.editItemFixedCost(data);
  }

  getFixedCostByItemId() {
    this.itemService.getItemFixedCost(this.id)
    this.itemService.dataFixedCostById.subscribe(res => {
      if (res) {
        this.fixedCostForm.clear()

        res.forEach(element => {
          let data = this.fb.group({
            id: element.id,
            itemId : this.id,
            uomId: element.uomId,
            itemVariantId: element.itemVariantId,
            fixedCost:element.fixedCost,
            uomName: element.uomName,
            itemVariantName: element.itemVariantName
          })
          this.fixedCostForm.push(data)
        });
      }

    })

  }




  generateVariant() {
    this.itemService.generateVariant({ itemId: this.id })
  }


  onCancel() {
    this._router.navigateTo(`/masterdata/item-definition`)

  }

}
