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
  AddStockOutDto,
  AddVariantLine,
  AddWarehouse,
  AdvancedSearchDto,
  AttributesVariants,
  EditAttributes,
  EditWareHouse,
  GeneralSettingDto,
  GetItemById,
  GetItemCategoryDto,
  getUomByItemId,
  GetWarehouseList,
  IOperationalTag,
  itemDefinitionDto,
  ItemTypeDto,
  Iuom,
  LatestItems,
  OperationalStockIn,
  StockInDetail,
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
import { GetWarehouseItems } from './models/GetWarehouseItem';

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
  operationTagDropdown(): Observable<OperationalStockIn[]> {
    return this.httpService.get(`OperationalTag/OperationalTagStockDropDown?OperationType=StockIn`);
  }

  getItemBarcodeForItem(barcode: string): Observable<StockInDetail> {
    return this.httpService.get(`Item/GetItemByBarcode?Barcode=${barcode}`);
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
    return this.httpService.delete(`StockOut/${id}`);
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
  deleteUOM(id: string) {
    return this.httpService.delete(`UOM/${id}`);
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

  getItemBarcodeById(id: number) {
    return this.httpService.get(`Item/GetItemBarcode/${id}`);
  }

  getItemFixedCost(id: number) {
    return this.httpService.get(`Item/GetItemFixedCost/${id}`);
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
    return this.httpService.get(`AttributeGroup/AttributeGroupDropDown`);
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
  attributeGroupsGetAttributes(id: number): Observable<itemAttributeValuesByID> {
    return this.httpService.get(`AttributeGroup/${id}/GetAttributes`);
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
  exportsItemsDefinitionList(SearchTerm?: string, SortBy?: number, SortColumn?: string): Observable<itemDefinitionDto[]> {
    let query = `Item/Export?`;
    const params: string[] = [];
    if (SearchTerm) params.push(`SearchTerm=${encodeURIComponent(SearchTerm)}`);
    if (SortBy !== undefined) params.push(`SortBy=${SortBy}`);
    if (SortColumn) params.push(`SortColumn=${SortColumn}`);
    query += params.join('&');
    return this.httpService.get<itemDefinitionDto[]>(query);
  }


  //   to export uom list


  ExportUOMList(SearchTerm?: string, SortBy?: number, SortColumn?: string) {
    let query = `UOM/ExportUOM?`;
    const params: string[] = [];
    if (SearchTerm) params.push(`SearchTerm=${encodeURIComponent(SearchTerm)}`);
    if (SortBy !== undefined) params.push(`SortBy=${SortBy}`);
    if (SortColumn) params.push(`SortColumn=${SortColumn}`);
    query += params.join('&');
    return this.httpService.get<any>(query);
  }
  //   to export operationalTag list
  ExportOperationalTagList(searchTerm?: string, SortBy?: number, SortColumn?: string): Observable<any> {
    let url = `OperationalTag/ExportOperationalTag?`;
    const params: string[] = [];

    if (searchTerm) params.push(`SearchTerm=${encodeURIComponent(searchTerm)}`);
    if (SortBy !== undefined) params.push(`SortBy=${SortBy}`);
    if (SortColumn) params.push(`SortColumn=${SortColumn}`);

    url += params.join('&');
    return this.httpService.get<any>(url); // HTTP GET request to the backend with parameters
  }


  //   to export attr list as excel
  ExporAttrList(searchTerm?: string, SortBy?: number, SortColumn?: string) {
    let url = `AttributeGroup/Export?`;
    const params: string[] = [];

    if (searchTerm) params.push(`SearchTerm=${encodeURIComponent(searchTerm)}`);
    if (SortBy !== undefined) params.push(`SortBy=${SortBy}`);
    if (SortColumn) params.push(`SortColumn=${SortColumn}`);

    url += params.join('&');
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
  editItemFixedCost(obj: any) {
    return this.httpService.put(`Item/EditItemFixedCost`, obj);
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
  getWarehouseView(
    searchTerm: string,
    warehouseId: number,
    pageInfo: PageInfo
  ): Observable<PaginationVm<GetWarehouseItems>> {
    // Construct the base query with warehouseId and pagination info
    let query = `WareHouse/GetItems?warehouseId=${warehouseId}&${pageInfo.toQuery}`;

    // Add SearchTerm if available
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }

    // Return the Observable from the HTTP GET request
    return this.httpService.get<PaginationVm<GetWarehouseItems>>(query);
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


  exportsWayehouseItemView(
    warehouseId?: number,
    SortBy?: number,
    SortColumn?: string
  ): Observable<GetWarehouseItems[]> {
    let query = `WareHouse/ExportItems?`;

    if (warehouseId !== undefined && warehouseId !== null) {
      query += `warehouseId=${warehouseId}`;
    }

    const params: string[] = [];

    if (SortBy !== undefined) {
      params.push(`SortBy=${SortBy}`);
    }

    if (SortColumn) {
      params.push(`SortColumn=${SortColumn}`);
    }

    if (params.length > 0) {
      query += '&' + params.join('&');
    }

    return this.httpService.get<GetWarehouseItems[]>(query);
  }


  exportsItemCategoryList(searchTerm?: string, SortBy?: number, SortColumn?: string): Observable<GetItemCategoryDto[]> {
    let query = `ItemCategory/Export?`;
    const params: string[] = [];

    if (searchTerm) params.push(`SearchTerm=${encodeURIComponent(searchTerm)}`);
    if (SortBy !== undefined) params.push(`SortBy=${SortBy}`);
    if (SortColumn) params.push(`SortColumn=${SortColumn}`);
    query += params.join('&');
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

  getLatestItemsList(): Observable<LatestItems[]> {
    return this.httpService.get(`Item/GetLatestItemsList`);
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

  getInventoryGeneralSetting(): Observable<GeneralSettingDto> {
    return this.httpService.get<GeneralSettingDto>(`InventoryGeneralSetting`);
  }
  editInventoryGeneralSetting(obj: GeneralSettingDto) {
    return this.httpService.put(`inventoryGeneralSetting`, obj);
  }
}
