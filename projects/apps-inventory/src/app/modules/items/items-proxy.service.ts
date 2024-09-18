import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { addBarcode, AddItemDefinitionDto, AddVariantLine, GetItemById, getUomByItemId, itemDefinitionDto, ItemTypeDto, Iuom, UomDefault } from './models';
import { EditItemDefinitionDto } from './models/editItemDefinitionDto';
import { variantGroupById } from './models/variantGroupById';
import { itemAttributeValues } from './models/itemAttributeValues';
import { getBarcodeById } from './models/getBarcodeById';
import { AddUom, UomPost } from './models/addUom';
import { addAttributeDifintion, IAttrributeDifinition } from './models/AttrbuteDiffintion';

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
  updateUOM(obj:UomPost) {
    return this.httpService.put(`UOM/Edit` , obj) 
   }
  updateAttrDifinition(obj:addAttributeDifintion) {
    return this.httpService.put(`ItemAttribute/Edit` , obj) 
   }

  generateVariant(obj : any) {
    return this.httpService.post(`ItemVariant/Generate` , obj)
  }

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
  
}
