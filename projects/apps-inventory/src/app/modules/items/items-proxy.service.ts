import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { addBarcode, AddItemCategory, AddItemDefinitionDto, AddOperatioalTag, AddVariantLine, AddWarehouse, EditWareHouse, GetItemById, GetItemCategoryDto, getUomByItemId, GetWarehouseList, IOperationalTag, itemDefinitionDto, ItemTypeDto, Iuom, UomDefault } from './models';
import { EditItemDefinitionDto } from './models/editItemDefinitionDto';
import { variantGroupById } from './models/variantGroupById';
import { itemAttributeValues } from './models/itemAttributeValues';
import { getBarcodeById } from './models/getBarcodeById';
import { AddUom, UomPost } from './models/addUom';
import { addAttributeDifintion, IAttrributeDifinition } from './models/AttrbuteDiffintion';
import { VieItemDefinitionDto } from './models/VieItemDefinitionDto';
import { AddTransaction } from './models/AddTransaction';

@Injectable({
  providedIn: 'root'
})
export class ItemsProxyService {

  constructor(private httpService : HttpService) { }
  getItemType(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<ItemTypeDto>> {
    let query = `ItemType?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<ItemTypeDto>>(query)
  }
  getItemDefinition(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<itemDefinitionDto>> {
    let query = `Item?${pageInfo.toQuery}`;
    
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    
    return this.httpService.get<PaginationVm<itemDefinitionDto>>(query);
  }

  addItemDefinition(obj : AddItemDefinitionDto){
    return this.httpService.post('Item',obj)
  }
 
  ViewDefinitionById(id : number ): Observable<EditItemDefinitionDto>{
    return this.httpService.get(`Item/${id}`)
  }
  getItemViewDefinitionById(id : number ): Observable<VieItemDefinitionDto>{
    return this.httpService.get(`StorageInformation/${id}`)
  }

  deleteItemDefinition(id : number ){
    return this.httpService.delete(`Item/${id}`)
  }
  deleteUOM(id : number ) {
    return this.httpService.delete(`UOM/DeleteUOM/${id}` )
  }
    
  deleteAttributeGroup(id:number) {
    return this.httpService.delete(`AttributeGroup/${id}`)
  }
  deleteAttrDifinition(id : number ) {
    return this.httpService.delete(`ItemAttribute/${id}` )
  }

  addVariantLine(obj:AddVariantLine) {
    return this.httpService.post('AttributesVariants',obj)

  }
  
 itemTypeLookup() {
  return this.httpService.get(`ItemType/ItemTypeDropDown`)
 }
 addItemCategory(obj : AddItemCategory) {
  return this.httpService.post(`ItemCategory` , obj)
 }
 editItemCategory(obj : AddItemCategory) {
  return this.httpService.put(`ItemCategory/Edit` , obj)
 }
 deleteItemCategory(id : number) {
  return this.httpService.delete(`ItemCategory/${id}` )

 }
 getItemCategory(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<GetItemCategoryDto>> {

    let query = `ItemCategory/ItemCategoryList?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<GetItemCategoryDto>>(query)
  
  
 }
 getItemCategoryById(id : number){
  return this.httpService.get(`ItemCategory/${id}`)

 }
 getItemCategoryTreeList() {
  return this.httpService.get('ItemCategory/GetTree')

 }
 ItemCategoryDropDown() {
  return this.httpService.get(`ItemCategory/ItemCategoryDropDown`)
 }
 tagDropDown() {
  return this.httpService.get(`GeneralSettings/GetTagsDropDown?module=inventory`)//
 }
 AccountsDropDown() {
  return this.httpService.get(`Accounts`)//id
 }
 taxesDropDropDown() {
  return this.httpService.get(`GeneralSettings/GetTaxDropDown`)//
 }
 uomCodeDropDown(id:number) {
  return this.httpService.get(`UOM/GetUOMsByUOMCategoryId/${id}`)//
 }
 getCodeByuomCodeDropDown(id:number) : Observable<{ code: number; conversionRatio: string}> {
  return this.httpService.get(`UOM/GetUOMCodeByUOMId/${id}`)//
 }
 getTrackingDropDown() {
  return this.httpService.get(`Tracking/TrackingDropDown`)//
 }
 UOMCategoryDropDown() {
  return this.httpService.get(`UOMCategories/UOMCategoryDropDown`)
 }

 getUomDropDown() {
  return this.httpService.get(`UOM/UOMDropDown`)
 }

 getUomDropDownByUomCategory(id:number) {
  return this.httpService.get(`ItemUOM/GetItemUOMsByUOMId/${id}`)
 }
 getItemVariantsByItemIdDropDown(id:number) {
  return this.httpService.get(`ItemVariant/ItemVariantsByItemIdDropDown?ItemId=${id}`)

 }
  
 attributeGroups(){
  return this.httpService.get(`AttributesVariants/GetAllAttributesGroups`)
 }


 getDefaultUnit(catID : number ,itemId:number) :Observable<{ id: number; name: string }>{
  return this.httpService.get(`UOM/GetDefaultUOMByUOMCategoryIdAndItemId/${catID}/${itemId}`)

 }


 AttributeGroupDropDown(){
  return this.httpService.get(`AttributeGroup/AttributeGroupDropDown
`)
 }
 attributeGroupsValue(id:number) : Observable<itemAttributeValues[]> {
  return this.httpService.get(`AttributesVariants/ItemAttributeByIdDropDown?Id=${id}`)
 }
 attributeGroupsValuesData(id:number) : Observable<itemAttributeValues[]> {
  return this.httpService.get(`api/ItemAttributesGroup/GetAttributesByLineId?Id=${id}`)
 }
 ActivateVairiantGroup(obj:{id:number}) {
  return this.httpService.put(`AttributesVariants/ActivateAttributesVariants` , obj) // edit
 }
 ActivateUOM(obj:{id:number}) {
  return this.httpService.put(`UOM/ActivateUOM` , obj) // edit
 }
 ActivateBarcode(obj:{id:number , status : boolean}) {
  return this.httpService.put(`Barcode/ItemBarcodeActivation` , obj) // edit
 }
 ActivateAttrDifinition(obj:{id:number , status : boolean}) {
  return this.httpService.put(`ItemAttribute/ItemAttributeActivation` , obj) // edit
 }

 exportsItemsDefinitionList(
    searchTerm: string | undefined
  ): Observable<itemDefinitionDto[]> {
    let query = `Item/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
     return this.httpService.get<itemDefinitionDto[]>(query);
  }

  //   to export uom list
  ExportUOMList(SearchTerm: string | undefined){
    let url = `UOM/ExportUOM`
    if(SearchTerm) url +=`SearchTerm=${encodeURIComponent(SearchTerm)}`
    return this.httpService.get<any>(url)

  }
  //   to export operationalTag list
  ExportOperationalTagList(SearchTerm: string | undefined){
    let url = `OperationalTag/Export`
    if(SearchTerm) url +=`SearchTerm=${encodeURIComponent(SearchTerm)}`
    return this.httpService.get<any>(url)

  }
  //   to export attr list as excel
  ExporAttrList(SearchTerm: string | undefined){
    let url = `AttributeGroup/Export
`
    if(SearchTerm) url +=`SearchTerm=${encodeURIComponent(SearchTerm)}`
    return this.httpService.get<any>(url)

  }
  
  deleteVariant(id:number) {
    return this.httpService.delete(`api/ItemAttributesGroup/${id}`)
  }
  deleteBarcode(id:number) {
    return this.httpService.delete(`Barcode/${id}`)
  }

  getAttributeVariantById(id:number) : Observable<variantGroupById[]>{
    return this.httpService.get(`api/ItemAttributesGroup/GetAllAttributeLinesByItemId?ItemId=${id}`)
  }

  addBarcode(obj:addBarcode) {
    return this.httpService.post('Barcode' , obj)
  }
  addUOM(obj:AddUom) {
    return this.httpService.post('ItemUom' , obj)
  }
  addUOMCategory(obj:UomPost) {
    return this.httpService.post('UOM' , obj)
  }
  //  add attr de
  addAttrDifinition(obj:addAttributeDifintion) {
    return this.httpService.post('ItemAttribute' , obj)
  }
  //  add operation tag 
  addOperationTag(obj:AddOperatioalTag) {
    return this.httpService.post('OperationalTag' , obj)
  }
 
  getBarcodeByItemId(id:number) : Observable<getBarcodeById[]> {
    return this.httpService.get(`Barcode/GetBarCodeByItemId/${id}`)
  }
  getItemById(id:number) : Observable<GetItemById> {
    return this.httpService.get(`Item/${id}`)
  }
  getOperationalTagById(id:number) : Observable<AddOperatioalTag> {
    return this.httpService.get(`OperationalTag/${id}`)
  }
  deleteOperationalTag(id : number ){
    return this.httpService.delete(`OperationalTag/Delete/${id}`)
  }

  getUomByItemId(id:number) : Observable<getUomByItemId[]> {
    return this.httpService.get(`ItemUOM/GetAllItemUOMsByItemId?Id=${id}`)

  }

  setUomDefault( obj : UomDefault) {
    return this.httpService.put(`UOM/SetDefaultUOM` , obj)

  }

  editItem(obj : any){
    return this.httpService.put(`Item/Edit` , obj)
  }
  editOperationalTag(obj :AddOperatioalTag){
    return this.httpService.put(`OperationalTag` , obj)
  }
  updateUOM(obj:UomPost) {
    return this.httpService.put(`UOM/Edit` , obj) 
   }
  updateAttrDifinition(obj:addAttributeDifintion) {
    return this.httpService.put(`ItemAttribute/Edit` , obj) 
   }

  generateVariant(obj : any) {
    return this.httpService.post(`ItemVariant/Generate` , obj)
  }
  // warehouse
  getListOfUom(SearchTerm : string| undefined,pageInfo :PageInfo ): Observable<Iuom> {
  let url = `UOM?${pageInfo.toQuery}`

  if(SearchTerm ){
    url +=`&SearchTerm=${encodeURIComponent(SearchTerm)}`
  }
    return this.httpService.get<Iuom>(url)
   }

  getListOfAttr(SearchTerm : string| undefined,pageInfo :PageInfo ): Observable<IAttrributeDifinition> {
  let url = `AttributeGroup/GetAllWithValues?${pageInfo.toQuery}`

  if(SearchTerm ){
    url +=`&SearchTerm=${encodeURIComponent(SearchTerm)}`
  }
    return this.httpService.get(url)
   }

  
  getWarehouseList(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<GetWarehouseList>> {
    let query = `WareHouse?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<GetWarehouseList>>(query)
  }

//  operational tag list
getOperationalTagList(searchTerm: string, pageInfo: PageInfo): Observable<IOperationalTag> {
    let query = `OperationalTag?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<IOperationalTag>(query)
  }

  exportsWayehouseList(
    searchTerm: string | undefined
  ): Observable<GetWarehouseList[]> {
    let query = `WareHouse/ExportWareHouse?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
     return this.httpService.get<GetWarehouseList[]>(query);
  }
  exportsItemCategoryList(
    searchTerm: string | undefined
  ): Observable<GetItemCategoryDto[]> {
    let query = `ItemCategory/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
     return this.httpService.get<GetItemCategoryDto[]>(query);
  }
  deleteWareHouse(id : number ){
    return this.httpService.delete(`WareHouse/DeleteWareHouse/${id}`)
  }

  addWarehouse(obj : AddWarehouse) {
    return this.httpService.post(`WareHouse/QuickAdd` , obj)
  }
  editWarehouse(obj : EditWareHouse) {
    return this.httpService.put(`WareHouse/EditWareHouse` , obj)
  }
  getWarehouseById(id : number) : Observable<AddWarehouse> {
    return this.httpService.get(`WareHouse/${id}`)
  }

  getCarcodeWithItem(Barcode: number): Observable<any> {
    return this.httpService.get(`Barcode/GetItemBarcodeWithItemVariantAndItemByBarcode?Barcode=${Barcode}`);
  }
  // 
  // getGlAccountLookup() {
  //   return this.httpService.get<any>(`WareHouse/`);
  // }
  // getCashSalesLookup() {
  //   return this.httpService.get<any>(`WareHouse/`);
  // }
  // getCreditSalesLookup() {
  //   return this.httpService.get<any>(`WareHouse/`);
  // }
  // getSalesReturnLookup() {
  //   return this.httpService.get<any>(`WareHouse/`);
  // }
  // getPurchaseAccountLookup() {
  //   return this.httpService.get<any>(`WareHouse/`);
  // }
  // getSalesCostCenterLookup() {
  //   return this.httpService.get<any>(`WareHouse/`);
  // }
  // getDiscountAccountLookup() {
  //   return this.httpService.get<any>(`WareHouse/`);
  // }
  // getEvaluationAccountLookup() {
  //   return this.httpService.get<any>(`WareHouse/`);
  // }
  // getAdjustmentAccountLookup() {
  //   return this.httpService.get<any>(`WareHouse/`);
  // }
  // getGoodsInTransitLookup() {
  //   return this.httpService.get<any>(`WareHouse/`);
  // }
  // getCityLookup() {
  //   return this.httpService.get<any>(`WareHouse/`);
  // }
  // getCompanyPhoneLookup() {
  //   return this.httpService.get<any>(`WareHouse/`);
  // }
  getBranchDropdown() {
    return this.httpService.get<any>(`GeneralSettings/BranchDropdown`);
  }
  getWareHousesDropDown() {
    return this.httpService.get<any>(`WareHouse/WareHousesDropDown`);
  }
  getCitiesDropdown(CountryCode:string) {
    return this.httpService.get<any>(`GeneralSettings/GetCities?CountryCode=${CountryCode}`);
  }
  getCcountriesDropdown() {
    return this.httpService.get<any>(`GeneralSettings/GetCountries`);
  }

  
 addTransaction(model:AddTransaction) {

    return this.httpService.post<any>(`Transaction`,model);
  }

}

