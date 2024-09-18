import { Injectable } from '@angular/core';
import { ItemsProxyService } from './items-proxy.service';
import { LanguageService, PageInfo, PageInfoResult, RouterService, ToasterService } from 'shared-lib';
import { BehaviorSubject } from 'rxjs';
import { addBarcode, AddItemDefinitionDto, AddVariantLine, GetItemById, getUomByItemId, itemDefinitionDto, ItemTypeDto,  Iuom,  IuomResult, UomCodeLookup, UomDefault } from './models';
import { EditItemDefinitionDto } from './models/editItemDefinitionDto';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { variantGroupById } from './models/variantGroupById';
import { itemAttributeValues } from './models/itemAttributeValues';
import { getBarcodeById } from './models/getBarcodeById';
import { AddUom, UomPost } from './models/addUom';
import { addAttributeDifintion, IAttrributeDifinitionResult } from './models/AttrbuteDiffintion';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private itemProxy : ItemsProxyService , private toasterService : ToasterService , private languageService : LanguageService , private router : RouterService) { }
  sendItemTypeDataSource  = new BehaviorSubject<ItemTypeDto[]>([])
  sendItemDefinitionDataSource  = new BehaviorSubject<itemDefinitionDto[]>([])
  sendDataDefinitionById  = new BehaviorSubject<EditItemDefinitionDto>({} as EditItemDefinitionDto)
  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});
  public itemTypeLookup = new BehaviorSubject<{ id: number; nameAr: string; nameEn: string }[]>([]);
  public itemCategoryLookup = new BehaviorSubject<{ id: number; nameAr: string; nameEn: string }[]>([]);
  public tagLookup = new BehaviorSubject<{ id: number; name: string}[]>([]);
  public AccountsDropDownLookup = new BehaviorSubject<{ id: number; nameAr: string; nameEn: string }[]>([]);
  public trackingTrackingDropDown = new BehaviorSubject<{ id: number; name: string}[]>([]);
  public taxesLookup = new BehaviorSubject<{ id: number; nameAr: string; nameEn: string }[]>([]);
  public uomCodeLookup = new BehaviorSubject<UomCodeLookup[]>([]);

  public codeByuomCodeDropDown = new BehaviorSubject<{ code: string }>({ code: '' });
  public UOMCategoryDropDownLookup = new BehaviorSubject<{ id: number; name: string }[]>([]);
  public UOMDropDownLookup = new BehaviorSubject<{ id: number; nameEn: string }[]>([]);
  public UOMDropDownLookupByUomCategory = new BehaviorSubject<{ id: number; nameEn: string }[]>([]);
  public ItemVariantsByItemIdDropDown = new BehaviorSubject<{ id: number; nameEn: string }[]>([]);
  public addVariantLineData = new BehaviorSubject<any>('');
  public ActivateVairiantGroupData = new BehaviorSubject<boolean>(false);
  public sendAttributeVariantData = new BehaviorSubject<variantGroupById[]>([]);
  public sendBarcode = new BehaviorSubject<addBarcode>({} as addBarcode);
  public sendUOM = new BehaviorSubject<AddUom>({} as AddUom);
  public sendUOMCategory= new BehaviorSubject<UomPost>({} as UomPost);
  public sendAttrDefinition= new BehaviorSubject<addAttributeDifintion>({});
  public GetBarcode = new BehaviorSubject<getBarcodeById[]>([]);
  public GetItemByID = new BehaviorSubject<GetItemById>({} as GetItemById);
  public GetUomListByItemId = new BehaviorSubject<getUomByItemId[]>([]);
  public sendDefault = new BehaviorSubject<boolean>(false);
  public editItemData = new BehaviorSubject<any>(false);
  public updateUOMobj = new BehaviorSubject<any>(false);
  public updateAttrobj = new BehaviorSubject<addAttributeDifintion>({});

  public attributeNameDropDownLookup = new BehaviorSubject<any>([]);
  public attributeGroupeDropDownLookup = new BehaviorSubject<{id:number,name:string}[]>([]);
  public attributeValuesDropDownLookup = new BehaviorSubject<itemAttributeValues[]>([]);
  public attributeValuesData = new BehaviorSubject<itemAttributeValues[]>([]);

  public exportedItemDefinitionListDataSource = new BehaviorSubject<itemDefinitionDto[]>([]);
  public SendexportUOMList= new BehaviorSubject<IuomResult[]>([]);
  public SendexportAttrDifinitionList= new BehaviorSubject<any[]>([]);
  public listOfUOM = new BehaviorSubject<IuomResult[]>([]);
  public listOfAttrDifinition = new BehaviorSubject<IAttrributeDifinitionResult[]>([]);

  public sendItemDefinitionDataSourceObs  = this.sendItemDefinitionDataSource.asObservable()
  public SendexportUOMList$  = this.SendexportUOMList.asObservable()
  public SendexportAttrDifinitionList$  = this.SendexportAttrDifinitionList.asObservable()
  public itemTypeLookupObs  = this.itemTypeLookup.asObservable()
  public itemCategoryLookupObs  = this.itemCategoryLookup.asObservable()
  public tagLookupObs  = this.tagLookup.asObservable()
  public AccountsDropDownLookupObs  = this.AccountsDropDownLookup.asObservable()
  public taxesLookupObs  = this.taxesLookup.asObservable()
  public uomCodeLookupObs  = this.uomCodeLookup.asObservable()
  public trackingTrackingDropDownObs  = this.trackingTrackingDropDown.asObservable()
  public codeByuomCodeDropDownObs  = this.codeByuomCodeDropDown.asObservable()
  public UOMCategoryDropDownLookupObs  = this.UOMCategoryDropDownLookup.asObservable()
  public UOMDropDownLookupObs  = this.UOMDropDownLookup.asObservable()
  public UOMDropDownLookupByUomCategoryObs  = this.UOMDropDownLookupByUomCategory.asObservable()
  public ItemVariantsByItemIdDropDownObs  = this.ItemVariantsByItemIdDropDown.asObservable()
  public sendDataDefinitionByIdObs  = this.sendDataDefinitionById.asObservable()
  public attributeNameDropDownLookupObs  = this.attributeNameDropDownLookup.asObservable()
  public attributeGroupeDropDownLookup$  = this.attributeGroupeDropDownLookup.asObservable()
  public attributeValuesDropDownLookupObs  = this.attributeValuesDropDownLookup.asObservable()
  public attributeValuesDataObs  = this.attributeValuesData.asObservable()
  public addVariantLineDataObs  = this.addVariantLineData.asObservable()
  public publicActivateVairiantGroupDataObs  = this.ActivateVairiantGroupData.asObservable()
  public sendAttributeVariantDataObs  = this.sendAttributeVariantData.asObservable()
  public sendBarcodeObs  = this.sendBarcode.asObservable()
  public sendUOMObs  = this.sendUOM.asObservable()
  public sendUOMCategory$  = this.sendUOMCategory.asObservable()
  public sendAttrDefinition$  = this.sendAttrDefinition.asObservable()
  public GetBarcodeObs  = this.GetBarcode.asObservable()
  public GetItemByIDObs  = this.GetItemByID.asObservable()
  public GetUomListByItemIdObs  = this.GetUomListByItemId.asObservable()
  public sendDefaultObs  = this.sendDefault.asObservable()
  public editItemDataObs  = this.editItemData.asObservable()
  public updateUOMobj$  = this.updateUOMobj.asObservable()
  public listOfUOMs  = this.listOfUOM.asObservable()
  public listOfAttrDifinition$  = this.listOfAttrDifinition.asObservable()
  public updateAttrobj$  = this.updateAttrobj.asObservable()



  getItemType(quieries: string, pageInfo: PageInfo)  {
    this.itemProxy.getItemType(quieries, pageInfo).subscribe((response) => {
     this.sendItemTypeDataSource.next(response.result)
     this.currentPageInfo.next(response.pageInfoResult)
    });
  }
  getItemDefinition(quieries: string, pageInfo: PageInfo)  {
    this.itemProxy.getItemDefinition(quieries, pageInfo).subscribe((response) => {
     this.sendItemDefinitionDataSource.next(response.result)
     this.currentPageInfo.next(response.pageInfoResult)
    });
  } 
  getListOfUom(SearchTerm : string | undefined,pageInfo: PageInfo )  {
    this.itemProxy.getListOfUom(SearchTerm, pageInfo).subscribe((response:Iuom) => {
     this.listOfUOM.next(response.result)
     this.currentPageInfo.next(response.pageInfoResult)
    });
  } 
  getListOfAttr(SearchTerm : string | undefined,pageInfo: PageInfo )  {
    this.itemProxy.getListOfAttr(SearchTerm, pageInfo).subscribe((response) => {
     this.listOfAttrDifinition.next(response.result)
     this.currentPageInfo.next(response.pageInfoResult)
    });
  } 



  addItemDefinition( obj: AddItemDefinitionDto, dialogRef: DynamicDialogRef,text : string) {
    this.itemProxy.addItemDefinition(obj).subscribe(res=>{
      if(res) {
        console.log("success",res);
        
        this.toasterService.showSuccess(
          this.languageService.transalte('itemDefinition.success'),
          this.languageService.transalte('itemDefinition.add')
       
        );
        let dataRes : number = Number(res)
        if(text == 'save') {
          dialogRef.close(res)
        }else{
          this.router.navigateTo(`/masterdata/add-item-definition/${dataRes}` )
          dialogRef.close()
        }
    
      }
    })
  }

  addVariantLine(obj : AddVariantLine) {
    this.itemProxy.addVariantLine(obj).subscribe(res=>{
      this.addVariantLineData.next(res)
    })
  }



 
  getItemDefinitionById(id : number) {
    this.itemProxy.getItemDefinitionById(id).subscribe(res=>{
      if(res) {
        this.sendDataDefinitionById.next(res)
      }
    })
  }


  exportsItemsDefinitionList(searchTerm:string | undefined) {
    this.itemProxy.exportsItemsDefinitionList(searchTerm).subscribe({
      next: (res : any) => {
         this.exportedItemDefinitionListDataSource.next(res);
      },
    });
  }

  exportUOMList(SearchTerm: string | undefined){
    this.itemProxy.ExportUOMList(SearchTerm).subscribe({
      next:(res : Iuom)=>{
        this.SendexportUOMList.next(res.result)
      }
    })
  }
  exportAttrDifinitionList(SearchTerm: string | undefined){
    this.itemProxy.ExporAttrList(SearchTerm).subscribe({
      next:(res : any)=>{
        this.SendexportAttrDifinitionList.next(res)
      }
    })
  }
  itemTypeLookupData() {
    this.itemProxy.itemTypeLookup().subscribe({
      next: (res : any) => {
         this.itemTypeLookup.next(res);
      },
    });
  }
  ItemCategoryDropDown() {
    this.itemProxy.ItemCategoryDropDown().subscribe({
      next: (res : any) => {
         this.itemCategoryLookup.next(res);
      },
    });
  }
  tagDropDown() {
    this.itemProxy.tagDropDown().subscribe({
      next: (res : any) => {
         this.tagLookup.next(res);
      },
    });
  }
  AccountsDropDown() {
    this.itemProxy.AccountsDropDown().subscribe({
      next: (res : any) => {
         this.AccountsDropDownLookup.next(res);
      },
    });
  }
  taxesDropDropDown() {
    this.itemProxy.taxesDropDropDown().subscribe({
      next: (res : any) => {
         this.taxesLookup.next(res);
      },
    });
  }
  uomCodeDropDown(id:number) {
    this.itemProxy.uomCodeDropDown(id).subscribe({
      next: (res : any) => {
         this.uomCodeLookup.next(res);
      },
    });
  }
  getCodeByuomCodeDropDown(id:number) {
    this.itemProxy.getCodeByuomCodeDropDown(id).subscribe({
      next: (res : any) => {
        this.codeByuomCodeDropDown.next(res);
      },
    });
  }
  getTrackingDropDown(){
    this.itemProxy.getTrackingDropDown().subscribe({
      next: (res : any) => {
         this.trackingTrackingDropDown.next(res);

      },
    });
  }
  UOMCategoryDropDown() {
    
    this.itemProxy.UOMCategoryDropDown().subscribe({
      next: (res : any) => {
         this.UOMCategoryDropDownLookup.next(res);
      },
    });
  }
  getUomDropDown() {
    this.itemProxy.getUomDropDown().subscribe({
      next: (res : any) => {
         this.UOMDropDownLookup.next(res);
      },
    });
  }
  getUomDropDownByUomCategory(id:number) {
    this.itemProxy.getUomDropDownByUomCategory(id).subscribe({
      next: (res : any) => {
         this.UOMDropDownLookupByUomCategory.next(res);
      },
    });
  }
  getItemVariantsByItemIdDropDown(id:number) {
    this.itemProxy.getItemVariantsByItemIdDropDown(id).subscribe({
      next: (res : any) => {
         this.ItemVariantsByItemIdDropDown.next(res);
      },
    });
  }

  attributeGroups() {
    this.itemProxy.attributeGroups().subscribe({
      next: (res : any) => {
         this.attributeNameDropDownLookup.next(res);
      },
    });
  }
  AttributeGroupDropDown() {
    this.itemProxy.AttributeGroupDropDown().subscribe({
      next: (res : any) => {
         this.attributeGroupeDropDownLookup.next(res);
      },
    });
  }

  attributeGroupsValue(id : number) {
    this.itemProxy.attributeGroupsValue(id ).subscribe({
      next: (res : any) => {
         this.attributeValuesDropDownLookup.next(res);
      },
    });
  }
  attributeGroupsValuesData(id : number) {
    this.itemProxy.attributeGroupsValuesData(id ).subscribe({
      next: (res : any) => {
         this.attributeValuesData.next(res);
      },
    });
  }

  ActivateVairiantGroup(obj:any){
    this.itemProxy.ActivateVairiantGroup(obj).subscribe(res=>{
      this.toasterService.showSuccess(
        this.languageService.transalte('itemType.success'),
        this.languageService.transalte('itemType.changeVariantStatus')
      );
    })
  }
  ActivateBarcode(obj:any){
    this.itemProxy.ActivateBarcode(obj).subscribe(res=>{
      this.toasterService.showSuccess(
        this.languageService.transalte('itemType.success'),
        this.languageService.transalte('itemType.changeBarcodeStatus')
      );
    })
  }
  ActivateAttrDefinition(obj:any){
    this.itemProxy.ActivateAttrDifinition(obj).subscribe(res=>{
      this.toasterService.showSuccess(
        this.languageService.transalte('attributeDefinition.success'),
        this.languageService.transalte('attributeDefinition.changeAttributrDifinitionStatus')
      );
    })
  }
  ActivateUOM(obj:any){
    this.itemProxy.ActivateUOM(obj).subscribe(res=>{
      this.toasterService.showSuccess(
        this.languageService.transalte('UOM.success'),
        this.languageService.transalte('UOM.changeAttributrDifinitionStatus')
      );
    })
  }

  async deleteItemDefinition(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.itemProxy.deleteItemDefinition(id).subscribe({
        next: (res) => {
          
          this.toasterService.showSuccess(
            this.languageService.transalte('itemType.success'),
            this.languageService.transalte('itemType.delete')
          );
       
          const currentCostCenter = this.sendItemDefinitionDataSource.getValue();
          const updatedCostCenter = currentCostCenter.filter((c) => c.id !== id);
          this.sendItemDefinitionDataSource.next(updatedCostCenter);
        },
        
      });
    }
  }
  // attr difinition delete
  async deleteAttrDifinition(id: number) {
    debugger
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.itemProxy.deleteAttrDifinition(id).subscribe({
        
        next: (res) => {
        debugger  
          this.toasterService.showSuccess(
            this.languageService.transalte('attributeDefinition.success'),
            this.languageService.transalte('attributeDefinition.delete')
          );
       
          debugger
          const currentAttrDif = this.attributeValuesDropDownLookup.getValue();
          const updatedAttrDif =currentAttrDif.filter((c:any) => c.id !== id);
          this.attributeValuesDropDownLookup.next(updatedAttrDif);
        },
        
      });
    }
  }
  // attr difinition delete
  async deleteUOM(id: number) {
    debugger
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.itemProxy.deleteUOM(id).subscribe({
        
        next: (res) => {
        debugger  
          this.toasterService.showSuccess(
            this.languageService.transalte('UOM.success'),
            this.languageService.transalte('UOM.delete')
          );
       
          
          const currentUom = this.listOfUOM.getValue();
          const updatedUOM =currentUom.filter((c:any) => c.id !== id);
          this.listOfUOM.next(updatedUOM);
        },
        
      });
    }
  }
  // attr difinition delete
  async deleteUomCat(id: number) {
    debugger
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.itemProxy.deleteUOM(id).subscribe({
        
        next: (res) => {
        debugger  
          this.toasterService.showSuccess(
            this.languageService.transalte('UOM.success'),
            this.languageService.transalte('UOM.delete')
          );
       
          
          const currentUom = this.uomCodeLookup.getValue();
          const updatedUOM =currentUom.filter((c:any) => c.id !== id);
          this.uomCodeLookup.next(updatedUOM);
        },
        
      });
    }
  }
  // deleteAttributeGroup delete
  async deleteAttributeGroup(id: number) {
    debugger
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.itemProxy.deleteAttributeGroup(id).subscribe({
        
        next: (res) => {
        debugger  
          this.toasterService.showSuccess(
            this.languageService.transalte('attributeDefinition.success'),
            this.languageService.transalte('attributeDefinition.delete')
          );
       
          debugger
          const currentAttr = this.listOfAttrDifinition.getValue();
          const updatedattr =currentAttr.filter((c:any) => c.id !== id);
          this.listOfAttrDifinition.next(updatedattr);
        },
        
      });
    }
  }

  getAttributeVariantById(id:number) {
    this.itemProxy.getAttributeVariantById(id).subscribe(res=>{
      this.sendAttributeVariantData.next(res)
    })
  }

  async deleteVariant(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.itemProxy.deleteVariant(id).subscribe({
        next: (res) => {
          
          this.toasterService.showSuccess(
            this.languageService.transalte('itemType.success'),
            this.languageService.transalte('itemType.delete')
          );
          const currentVariant = this.sendAttributeVariantData.getValue();
          const updatedVariants = currentVariant.filter(c  => c.id !== id);
          this.sendAttributeVariantData.next(updatedVariants);
        },
        
      });
    }
  }
  

  addBarcode(obj:addBarcode){
    this.itemProxy.addBarcode(obj).subscribe(res=>{
      this.toasterService.showSuccess(
        this.languageService.transalte('itemType.success'),
        this.languageService.transalte('itemType.barcodesuccess')
      );
      this.sendBarcode.next(res)
    })
   }
  addUOM(obj:AddUom){
    this.itemProxy.addUOM(obj).subscribe(res=>{
      this.toasterService.showSuccess(
        this.languageService.transalte('itemType.success'),
        this.languageService.transalte('itemType.uomSuccess')
      );
      this.sendUOM.next(res)
    })
   }
  addUOMCategory(obj:UomPost){
    this.itemProxy.addUOMCategory(obj).subscribe(res=>{
      this.toasterService.showSuccess(
        this.languageService.transalte('itemType.success'),
        this.languageService.transalte('itemType.uomSuccess')
      );
      this.sendUOMCategory.next(res)
    })
   }
  addAttrDifintion(obj:addAttributeDifintion){
    this.itemProxy.addAttrDifinition(obj).subscribe(res=>{
      this.toasterService.showSuccess(
        this.languageService.transalte('itemType.success'),
        this.languageService.transalte('itemType.uomSuccess')
      );
      this.sendAttrDefinition.next(res)
    })
   }
   getBarcodeByItemId(id:number){
    return  this.itemProxy.getBarcodeByItemId(id).subscribe(res=>{
      this.GetBarcode.next(res)
    })
   }
   getItemById(id:number){
    return  this.itemProxy.getItemById(id).subscribe(res=>{
      if(res){
        this.GetItemByID.next(res)
      }
  
    })
   }
   getUomByItemId(id:number){
    return  this.itemProxy.getUomByItemId(id).subscribe(res=>{
      this.GetUomListByItemId.next(res)
    })
   }

   setUomDefault( obj : UomDefault) {
    return this.itemProxy.setUomDefault( obj).subscribe(res=>{
        this.toasterService.showSuccess(
          this.languageService.transalte('itemType.success'),
          this.languageService.transalte('itemType.statusuom')
        );
   
      this.sendDefault.next(res)
      
    })
   }
   generateVariant(obj:any) {
    return this.itemProxy.generateVariant(obj).subscribe(res=>{
      this.toasterService.showSuccess(
        this.languageService.transalte('itemType.success'),
        this.languageService.transalte('itemType.variantSuccess')
      );
     
  })
   }
   editItem(obj : any) {
    return  this.itemProxy.editItem(obj ).subscribe(res=>{
      if(res) {
        this.editItemData.next(res)
        this.toasterService.showSuccess(
          this.languageService.transalte('itemType.success'),
          this.languageService.transalte('itemType.itemEdit')
        );
        this.router.navigateTo(`/masterdata/item-definition` )
      }
    
    })
   }
   updateUOM(obj : any) {
    return  this.itemProxy.updateUOM(obj ).subscribe(res=>{
      if(res) {
        this.updateUOMobj.next(res)
        this.toasterService.showSuccess(
          this.languageService.transalte('UOM.success'),
          this.languageService.transalte('UOM.uomEdit')
        );
        // this.router.navigateTo(`/masterdata/item-definition` )
      }
    
    })
   }
   updateAttrDifinition(obj : addAttributeDifintion) {
    return  this.itemProxy.updateAttrDifinition(obj ).subscribe(res=>{
      if(res) {
        this.updateAttrobj.next(res)
        this.toasterService.showSuccess(
          this.languageService.transalte('attributeDefinition.success'),
          this.languageService.transalte('attributeDefinition.itemEdit')
        );
        // this.router.navigateTo(`/masterdata/item-definition` )
      }
    
    })
   }
}
