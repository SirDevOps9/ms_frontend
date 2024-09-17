import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { addBarcode, AddItemCategory, AddItemDefinitionDto, AddVariantLine, AddWarehouse, EditWareHouse, GetItemById, GetItemCategoryDto, getUomByItemId, GetWarehouseList, itemDefinitionDto, ItemTypeDto, UomDefault } from './models';
import { EditItemDefinitionDto } from './models/editItemDefinitionDto';
import { variantGroupById } from './models/variantGroupById';
import { itemAttributeValues } from './models/itemAttributeValues';
import { getBarcodeById } from './models/getBarcodeById';
import { AddUom } from './models/addUom';

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
    return this.httpService.get<PaginationVm<itemDefinitionDto>>(query)
  }

  addItemDefinition(obj : AddItemDefinitionDto){
    return this.httpService.post('Item',obj)
  }
 
  getItemDefinitionById(id : number ): Observable<EditItemDefinitionDto>{
    return this.httpService.get(`Item/${id}`)
  }
  deleteItemDefinition(id : number ){
    return this.httpService.delete(`Item/${id}`)
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
  return this.httpService.get(`Accounts`)//
 }
 taxesDropDropDown() {
  return this.httpService.get(`GeneralSettings/GetTaxDropDown`)//
 }
 uomCodeDropDown(id:number) {
  return this.httpService.get(`UOM/GetUOMsByUOMCategoryId/${id}`)//
 }
 getCodeByuomCodeDropDown(id:number) {
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
 attributeGroupsValue(id:number) : Observable<itemAttributeValues[]> {
  return this.httpService.get(`AttributesVariants/ItemAttributeByIdDropDown?Id=${id}`)
 }
 attributeGroupsValuesData(id:number) : Observable<itemAttributeValues[]> {
  return this.httpService.get(`api/ItemAttributesGroup/GetAttributesByLineId?Id=${id}`)
 }
 ActivateVairiantGroup(obj:{id:number}) {
  return this.httpService.put(`AttributesVariants/ActivateAttributesVariants` , obj) // edit
 }
 ActivateBarcode(obj:{id:number , status : boolean}) {
  return this.httpService.put(`Barcode/ItemBarcodeActivation` , obj) // edit
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
  
  deleteVariant(id:number) {
    return this.httpService.delete(`api/ItemAttributesGroup/${id}`)
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
  getBarcodeByItemId(id:number) : Observable<getBarcodeById[]> {
    return this.httpService.get(`Barcode/${id}`)
  }
  getItemById(id:number) : Observable<GetItemById> {
    return this.httpService.get(`Item/${id}`)
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

  generateVariant(obj : any) {
    return this.httpService.post(`ItemVariant/Generate` , obj)
  }
  // warehouse
  getWarehouseList(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<GetWarehouseList>> {
    let query = `WareHouse?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<GetWarehouseList>>(query)
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
  getCitiesDropdown(CountryCode:string) {
    return this.httpService.get<any>(`GeneralSettings/GetCities?CountryCode=${CountryCode}`);
  }
  getCcountriesDropdown() {
    return this.httpService.get<any>(`GeneralSettings/GetCountries`);
  }

  
}

