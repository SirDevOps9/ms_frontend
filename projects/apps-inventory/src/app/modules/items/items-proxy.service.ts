import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import {
  addBarcode,
  AddGeneralDto,
  AddItemCategory,
  AddItemDefinitionDto,
  AddOperatioalTag,
  AddStockIn,
  AddVariantLine,
  AddWarehouse,
  AdvancedSearchDto,
  AttributesVariants,
  EditAttributes,
  EditWareHouse,
  GetItemById,
  GetItemCategoryDto,
  getUomByItemId,
  GetWarehouseList,
  IOperationalTag,
  itemDefinitionDto,
  ItemTypeDto,
  Iuom,
  LatestItems,
  StockInDto,
  StockOutDto,
  UOMCategoryDto,
  UomDefault,
} from './models';
import { EditItemDefinitionDto } from './models/editItemDefinitionDto';
import { variantGroupById } from './models/variantGroupById';
import { itemAttributeValues, itemAttributeValuesByID } from './models/itemAttributeValues';
import { getBarcodeById } from './models/getBarcodeById';
import { addUOM, AddUom } from './models/addUom';
import { addAttributeDifintion, IAttrributeDifinition } from './models/AttrbuteDiffintion';
import { VieItemDefinitionDto } from './models/VieItemDefinitionDto';
import { GetItemUom } from './models/GetItemUom';

@Injectable({
  providedIn: 'root',
})
export class ItemsProxyService {
  constructor(private httpService: HttpService) {}
  getItemType(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<ItemTypeDto>> {
    let query = `ItemType?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<ItemTypeDto>>(query);
  }
  getItemDefinition(
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<itemDefinitionDto>> {
    let query = `Item?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<itemDefinitionDto>>(query);
  }
  getStockIn(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<StockInDto>> {
    let query = `Transaction/GetStockInTransactionList?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<StockInDto>>(query);
  }

  exportsStockInList(searchTerm: string | undefined): Observable<itemDefinitionDto[]> {
    let query = `Transaction/GetStockInTransactionList/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<itemDefinitionDto[]>(query);
  }

  getStockOut(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<StockInDto>> {
    let query = `Transaction/GetStockInTransactionList?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<StockInDto>>(query);
  }

  exportsStockOutList(searchTerm: string | undefined): Observable<itemDefinitionDto[]> {
    let query = `Transaction/GetStockInTransactionList/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<itemDefinitionDto[]>(query);
  }

  deleteStockOut(id: number) {
    return this.httpService.delete(`Transaction/GetStockInTransactionList/${id}`);
  }

  addItemDefinition(obj: AddItemDefinitionDto) {
    return this.httpService.post('Item', obj);
  }

  ViewDefinitionById(id: number): Observable<EditItemDefinitionDto> {
    return this.httpService.get(`Item/${id}`);
  }
  getItemViewDefinitionById(id: number): Observable<VieItemDefinitionDto> {
    return this.httpService.get(`StorageInformation/${id}`);
  }

  getGetItemUomonById(id: number) {
    return this.httpService.get(`Item/GetItemUom/${id}`);
  }

  deleteItemDefinition(id: number) {
    return this.httpService.delete(`Item/${id}`);
  }
  deleteUOM(id: number) {
    return this.httpService.delete(`UOM/DeleteUOM/${id}`);
  }

  deleteCategory(id: number) {
    return this.httpService.delete(`UOMCategories/DeleteUOMCategory/${id}`);
  }

  deleteAttributeGroup(id: number) {
    return this.httpService.delete(`AttributeGroup/${id}`);
  }
  deleteAttrDifinition(id: number) {
    return this.httpService.delete(`ItemAttribute/${id}`);
  }

  addVariantLine(obj: AddVariantLine) {
    return this.httpService.post('AttributesVariants', obj);
  }

  itemTypeLookup() {
    return this.httpService.get(`ItemType/ItemTypeDropDown`);
  }
  addItemCategory(obj: AddItemCategory) {
    return this.httpService.post(`ItemCategory`, obj);
  }
  editItemCategory(obj: AddItemCategory) {
    return this.httpService.put(`ItemCategory/Edit`, obj);
  }
  deleteItemCategory(id: number) {
    return this.httpService.delete(`ItemCategory/${id}`);
  }
  getItemCategory(
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<GetItemCategoryDto>> {
    let query = `ItemCategory/ItemCategoryList?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<GetItemCategoryDto>>(query);
  }
  //  item category tree
  ParentItemCategoriesDropDown(SearchTerm: string): Observable<{ id: number; name: string }[]> {
    let query = 'ItemCategory/ParentItemCategoriesDropDown';
    if (SearchTerm) {
      query += `&SearchTerm=${encodeURIComponent(SearchTerm)}`;
    }
    return this.httpService.get<{ id: number; name: string }[]>(query);
  }

  GetUOMCategories(
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<UOMCategoryDto>> {
    let query = `UOM?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<UOMCategoryDto>>(query);
  }
  getItemCategoryById(id: number) {
    return this.httpService.get(`ItemCategory/${id}`);
  }
  getItemCategoryTreeList() {
    return this.httpService.get('ItemCategory/GetTree');
  }
  ItemCategoryDropDown() {
    return this.httpService.get(`ItemCategory/ChildItemCategoriesDropDown`);
  }
  tagDropDown() {
    return this.httpService.get(`GeneralSettings/GetTagsDropDown?module=inventory`); //
  }
  AccountsDropDown() {
    return this.httpService.get(`Accounts`); //id
  }
  taxesDropDropDown() {
    return this.httpService.get(`GeneralSettings/GetTaxDropDown`); //
  }

  getTaxDataDropDropDown(id: number) {
    return this.httpService.get(`Item/GetTaxData/${id}`);
  }

  editItemTax(obj: any) {
    return this.httpService.put(`Item/EditTax`, obj);
  }
  editInventory(obj: any) {
    return this.httpService.put(`Item/UpdateItemExpiryAndTracking`, obj);
  }
  getInvenrory(id: number) {
    return this.httpService.get(`Item/GetItemExpiryAndTracking/${id}`);
  }

  DeleteUomLine(id: number) {
    return this.httpService.delete(`UOM/${id}`); //
  }

  getItemBarcodeById(id: number) {
    return this.httpService.get(`Item/GetItemBarcode/${id}`);
  }
  uomCodeDropDown(id: number) {
    return this.httpService.get(`UOM/GetUOMsByUOMCategoryId/${id}`); //
  }
  getUomById(id: number) {
    return this.httpService.get(`UOM/${id}`); //
  }

  getItemVariants(id: number) {
    return this.httpService.get(`Item/GetItemVariants/${id}`);
  }
  getItemAttributes(id: number) {
    return this.httpService.get(`Item/GetItemAttributes/${id}`);
  }
  EditItemAttributes(obj: EditAttributes) {
    return this.httpService.put(`Item/EditItemAttributesVariant`, obj);
  }

  getUOMByCategoryID(id: number) {
    return this.httpService.get(`UOMCategories/GetUOMCategoryWithUomsById/${id}`); //
  }
  getCodeByuomCodeDropDown(id: number): Observable<{ code: number; conversionRatio: string }> {
    return this.httpService.get(`UOM/GetUOMCodeByUOMId/${id}`); //
  }
  getTrackingDropDown() {
    return this.httpService.get(`Tracking/TrackingDropDown`); //
  }
  UOMCategoryDropDown() {
    return this.httpService.get(`UOMCategories/UOMCategoryDropDown`);
  }

  getUomDropDown() {
    return this.httpService.get(`UOM/UOMDropDown`);
  }

  getUomDropDownByUomCategory(id: number) {
    return this.httpService.get(`ItemUOM/GetItemUOMsByUOMId/${id}`);
  }
  getUomDropDownByUomItemId(id: number) {
    return this.httpService.get(`ItemUOM/GetAllItemUOMsByItemIdDropDown?Id=${id}`);
  }
  getUomByItemId(id: number): Observable<getUomByItemId[]> {
    return this.httpService.get(`ItemUOM/GetItemUOMsByUOMId/${id}`);
  }
  getAllUomByItemId(id: number): Observable<getUomByItemId[]> {
    return this.httpService.get(`ItemUOM/GetAllItemUOMsByItemId?Id=${id}`);
  }
  getItemVariantsByItemIdDropDown(id: number) {
    return this.httpService.get(`ItemVariant/ItemVariantsByItemIdDropDown?ItemId=${id}`);
  }

  getItemGetItemUomById(id: number) {
    return this.httpService.get(`Item/GetItemUom/${id}`);
  }

  updateItemGetItemUomById(obj: any) {
    return this.httpService.put(`Item/EditUom`, obj);
  }

  getUOMCategoryDropDown() {
    return this.httpService.get(`UOMCategories/UOMCategoryDropDown`);
  }
  getGetUOMsByUOMCategoryId(id: number) {
    return this.httpService.get(`UOM/GetUOMsByUOMCategoryId/${id}`);
  }

  getUserSubDomainModules() {
    return this.httpService.get(`SideMenu/GetUserSubDomainModules`);
  }

  attributeGroups() {
    return this.httpService.get(`AttributesVariants/GetAllAttributesGroups`);
  }

  getDefaultUnit(catID: number, itemId: number): Observable<{ id: number; name: string }> {
    return this.httpService.get(`UOM/GetDefaultUOMByUOMCategoryIdAndItemId/${catID}/${itemId}`);
  }

  AttributeGroupDropDown() {
    return this.httpService.get(`AttributeGroup/AttributeGroupDropDown
`);
  }
  attributeGroupsValue(id: number): Observable<itemAttributeValuesByID> {
    return this.httpService.get(`AttributeGroup/${id}`);
  }
  attributeGroupsValuesData(id: number): Observable<itemAttributeValues[]> {
    return this.httpService.get(`api/ItemAttributesGroup/GetAttributesByLineId?Id=${id}`);
  }
  ActivateVairiantGroup(obj: { id: number }) {
    return this.httpService.put(`AttributesVariants/ActivateAttributesVariants`, obj); // edit
  }

  ActivateUOM(obj: { id: number }) {
    return this.httpService.put(`UOM/ActivateUOM`, obj); // edit
  }
  ActivateBarcode(obj: { id: number; status: boolean }) {
    return this.httpService.put(`Barcode/ItemBarcodeActivation`, obj); // edit
  }
  ActivateAttrDifinition(obj: { id: number; status: boolean }) {
    return this.httpService.put(`ItemAttribute/ItemAttributeActivation`, obj); // edit
  }
  systemUnitLookup(): Observable<
    { id: number; nameAr: string; nameEn: string; systemUnitOfMeasureCategoryId: number }[]
  > {
    return this.httpService.get(`SystemUOM/DropDown`); // edit
  }
  ActivateOperationalTag(obj: { id: number; status: boolean }) {
    return this.httpService.put(`OperationalTag/ActivateOperationalTag`, obj); // edit
  }
  editStatusAttributeGroup(modle: any) {
    return this.httpService.put(`AttributeGroup/AttributeGroupActivation`, modle);
  }
  EditUOMCategory(obj: addUOM) {
    return this.httpService.put('UOMCategories/Edit', obj);
  }
  exportsItemsDefinitionList(searchTerm: string | undefined): Observable<itemDefinitionDto[]> {
    let query = `Item/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<itemDefinitionDto[]>(query);
  }

  //   to export uom list
  ExportUOMList(SearchTerm: string | undefined) {
    let url = `UOM/ExportUOM`;
    if (SearchTerm) url += `SearchTerm=${encodeURIComponent(SearchTerm)}`;
    return this.httpService.get<any>(url);
  }
  //   to export operationalTag list
  ExportOperationalTagList(SearchTerm: string | undefined) {
    let url = `OperationalTag/ExportOperationalTag`;
    if (SearchTerm) url += `SearchTerm=${encodeURIComponent(SearchTerm)}`;
    return this.httpService.get<any>(url);
  }

  //   to export attr list as excel
  ExporAttrList(SearchTerm: string | undefined) {
    let url = `AttributeGroup/Export`;
    if (SearchTerm) url += `SearchTerm=${encodeURIComponent(SearchTerm)}`;
    return this.httpService.get<any>(url);
  }

  deleteVariant(id: number) {
    return this.httpService.delete(`api/ItemAttributesGroup/${id}`);
  }
  deleteBarcode(id: number) {
    return this.httpService.delete(`Barcode/${id}`);
  }

  getAttributeVariantById(id: number): Observable<variantGroupById[]> {
    return this.httpService.get(
      `api/ItemAttributesGroup/GetAllAttributeLinesByItemId?ItemId=${id}`
    );
  }

  addBarcode(obj: addBarcode) {
    return this.httpService.put('Item/EditItemBarcode', obj);
  }
  addUOM(obj: AddUom) {
    return this.httpService.put('ItemUom', obj);
  }
  addUOMCategory(obj: addUOM) {
    return this.httpService.post('UOMCategories', obj);
  }
  getUOMCategoryById(id: number): Observable<addUOM> {
    return this.httpService.get(`UOMCategories/GetUOMCategoryWithUomsById/${id}`);
  }
  //  add attr de
  addAttrDifinition(obj: addAttributeDifintion) {
    return this.httpService.post('AttributeGroup/AddAttributeGroupWithAttributeValues', obj);
  }
  //  add operation tag
  addOperationTag(obj: AddOperatioalTag) {
    return this.httpService.post('OperationalTag', obj);
  }

  getBarcodeByItemId(id: number): Observable<getBarcodeById[]> {
    return this.httpService.get(`Barcode/GetBarCodeByItemId/${id}`);
  }
  getItemById(id: number): Observable<GetItemById> {
    return this.httpService.get(`Item/${id}`);
  }
  getOperationalTagById(id: number): Observable<AddOperatioalTag> {
    return this.httpService.get(`OperationalTag/${id}`);
  }
  deleteOperationalTag(id: number) {
    return this.httpService.delete(`OperationalTag/${id}`);
  }

  getUomByItemIdDropDown(id: number): Observable<any[]> {
    return this.httpService.get(`ItemUOM/GetAllItemUOMsByItemId?Id=${id}`);
  }

  setUomDefault(obj: UomDefault) {
    return this.httpService.put(`UOM/SetDefaultUOM`, obj);
  }

  editItem(obj: any) {
    return this.httpService.put(`Item/Edit`, obj);
  }
  editOperationalTag(obj: AddOperatioalTag) {
    return this.httpService.put(`OperationalTag`, obj);
  }
  updateUOM(obj: addUOM) {
    return this.httpService.put(`UOM/Edit`, obj);
  }
  updateAttrDifinition(obj: addAttributeDifintion) {
    return this.httpService.put(`AttributeGroup/EditAttributeGroupWithAttributeValues`, obj);
  }

  generateVariant(obj: any) {
    return this.httpService.post(`ItemVariant/Generate`, obj);
  }
  // warehouse
  getListOfUom(SearchTerm: string | undefined, pageInfo: PageInfo): Observable<Iuom> {
    let url = `UOM?${pageInfo.toQuery}`;

    if (SearchTerm) {
      url += `&SearchTerm=${encodeURIComponent(SearchTerm)}`;
    }
    return this.httpService.get<Iuom>(url);
  }

  getListOfAttr(
    SearchTerm: string | undefined,
    pageInfo: PageInfo
  ): Observable<IAttrributeDifinition> {
    let url = `AttributeGroup/GetAllWithValues?${pageInfo.toQuery}`;

    if (SearchTerm) {
      url += `&SearchTerm=${encodeURIComponent(SearchTerm)}`;
    }
    return this.httpService.get(url);
  }
  getWarehouseList(
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<GetWarehouseList>> {
    let query = `WareHouse?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<GetWarehouseList>>(query);
  }

  //  operational tag list
  getOperationalTagList(searchTerm: string, pageInfo: PageInfo): Observable<IOperationalTag> {
    let query = `OperationalTag?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<IOperationalTag>(query);
  }

  exportsWayehouseList(
    searchTerm?: string,
    SortBy?: number,
    SortColumn?: string
  ): Observable<GetWarehouseList[]> {
    let query = `WareHouse/ExportWareHouse?`;
    const params: string[] = [];
    if (searchTerm) params.push(`SearchTerm=${encodeURIComponent(searchTerm)}`);
    if (SortBy) params.push(`SortBy=${SortBy}`);
    if (SortColumn) params.push(`SortColumn=${SortColumn}`);
    query += params.join('&');
    return this.httpService.get<GetWarehouseList[]>(query);
  }

  exportsItemCategoryList(searchTerm: string | undefined): Observable<GetItemCategoryDto[]> {
    let query = `ItemCategory/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<GetItemCategoryDto[]>(query);
  }
  deleteWareHouse(id: number) {
    return this.httpService.delete(`WareHouse/DeleteWareHouse/${id}`);
  }

  addWarehouse(obj: AddWarehouse) {
    return this.httpService.post(`WareHouse/QuickAdd`, obj);
  }
  editWarehouse(obj: EditWareHouse) {
    return this.httpService.put(`WareHouse/EditWareHouse`, obj);
  }
  getWarehouseById(id: number): Observable<AddWarehouse> {
    return this.httpService.get(`WareHouse/${id}`);
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
  getCitiesDropdown(CountryCode: string) {
    return this.httpService.get<any>(`GeneralSettings/GetCities?CountryCode=${CountryCode}`);
  }
  getCcountriesDropdown() {
    return this.httpService.get<any>(`GeneralSettings/GetCountries`);
  }

  saveItemDefinitionGeneral(obj: AddGeneralDto) {
    return this.httpService.put('Item/EditGeneralData', obj);
  }

  getItemDefinitionGeneral(id: number): Observable<AddGeneralDto> {
    return this.httpService.get(`Item/GetGeneralData/${id}`);
  }

  operationTagDropdown(): Observable<{ id: number; name: string }[]> {
    return this.httpService.get(`OperationalTag/OperationalTagDropDown`);
  }
  getLatestItemsList(): Observable<LatestItems[]> {
    return this.httpService.get(`Item/GetLatestItemsList`);
  }

  addStockIn(obj: AddStockIn): Observable<AddStockIn> {
    return this.httpService.post('StockIn', obj);
  }
  editStockIn(obj: AddStockIn): Observable<AddStockIn> {
    return this.httpService.put('StockIn', obj);
  }
  getItems(
    quieries: string,
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<AdvancedSearchDto>> {
    let query = `Item/GetItemsAdvancedSearchList?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    if (quieries) {
      query += `&${quieries ? quieries : ''}`;
    }
    return this.httpService.get<PaginationVm<AdvancedSearchDto>>(query);
  }
  getAllStockOut(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<StockOutDto>> {
    let query = `StockOut?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<StockOutDto>>(query);
  }
  getAllStockIn(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<StockInDto>> {
    let query = `StockIn?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<StockInDto>>(query);
  }

  exportStockOutList(
    searchTerm?: string,
    SortBy?: number,
    SortColumn?: string
  ): Observable<StockOutDto[]> {
    let query = `StockOut/Export?`;
    const params: string[] = [];
    if (searchTerm) params.push(`searchTerm=${encodeURIComponent(searchTerm)}`);
    if (SortBy) params.push(`SortBy=${SortBy}`);
    if (SortColumn) params.push(`SortColumn=${SortColumn}`);
    query += params.join('&');
    return this.httpService.get<StockOutDto[]>(query);
  }

  exportStockInList(
    searchTerm?: string,
    SortBy?: number,
    SortColumn?: string
  ): Observable<StockInDto[]> {
    let query = `StockIn/Export?`;
    const params: string[] = [];
    if (searchTerm) params.push(`searchTerm=${encodeURIComponent(searchTerm)}`);
    if (SortBy) params.push(`SortBy=${SortBy}`);
    if (SortColumn) params.push(`SortColumn=${SortColumn}`);
    query += params.join('&');
    return this.httpService.get<StockInDto[]>(query);
  }

  deleteStockIn(id: number) {
    return this.httpService.delete(`StockIn/${id}`);
  }
  deleteStockInLine(id: number) {
    return this.httpService.delete(`StockIn/DeleteLine/${id}`);
  }

  getByIdStockOut(id: number) {
    return this.httpService.get(`StockOut/${id}`);
  }
  getStockInById(id: number) {
    return this.httpService.get(`StockIn/${id}`);
  }
  editStockOut(obj: StockOutDto) {
    return this.httpService.put(`StockOut`, obj);
  }
}
