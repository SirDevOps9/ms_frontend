import { EventEmitter, Injectable } from '@angular/core';
import { ItemsProxyService } from './items-proxy.service';
import {
  FormsService,
  LanguageService,
  LoaderService,
  PageInfo,
  PageInfoResult,
  RouterService,
  ToasterService,
} from 'shared-lib';
import { BehaviorSubject, firstValueFrom, map, ReplaySubject, Subject } from 'rxjs';
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
  GeneralSettingDto,
  GetItemById,
  GetItemCategoryDto,
  getUomByItemId,
  GetWarehouseList,
  IOperationalTag,
  IOperationalTagResult,
  itemDefinitionDto,
  ItemTypeDto,
  Iuom,
  IuomResult,
  LatestItems,
  OperationalStockIn,
  StockInDetail,
  StockInDto,
  UOMCategoryDto,
  UomCodeLookup,
  UomDefault,
  WarehouseAccountData,
} from './models';
import { EditItemDefinitionDto } from './models/editItemDefinitionDto';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { variantGroupById } from './models/variantGroupById';
import { ItemAttribute, itemAttributeValues } from './models/itemAttributeValues';
import { getBarcodeById } from './models/getBarcodeById';
import { addUOM, AddUom } from './models/addUom';
import { addAttributeDifintion, IAttrributeDifinitionResult } from './models/AttrbuteDiffintion';
import { OperationType } from './models/enums';
import { VieItemDefinitionDto } from './models/VieItemDefinitionDto';
import { GetItemUom } from './models/GetItemUom';
import { FormGroup } from '@angular/forms';
import { GetWarehouseItems } from './models/GetWarehouseItem';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  allowServerPagination: any;
  constructor(
    private itemProxy: ItemsProxyService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private router: RouterService,
    private loaderService: LoaderService,
    private formsService: FormsService
  ) {}
  sendItemTypeDataSource = new BehaviorSubject<ItemTypeDto[]>([]);
  sendItemDefinitionDataSource = new BehaviorSubject<itemDefinitionDto[]>([]);
  GetUOMCategoriesDataSource = new BehaviorSubject<UOMCategoryDto[]>([]);
  sendDataDefinitionById = new BehaviorSubject<EditItemDefinitionDto>({} as EditItemDefinitionDto);
  ViewDataDefinitionById = new BehaviorSubject<VieItemDefinitionDto>({} as VieItemDefinitionDto);
  public ViewDataItemUomById = new BehaviorSubject<any>([]);
  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});
  public itemTypeLookup = new BehaviorSubject<{ id: number; nameAr: string; nameEn: string }[]>([]);
  public itemCategoryLookup = new BehaviorSubject<{ id: number; name: string }[]>([]);
  public AddItemCategoryLookup = new BehaviorSubject<any>({} as any);
  public itemsCategoryDeleted = new BehaviorSubject<boolean>(false);
  public EditItemCategoryData = new BehaviorSubject<boolean>(false);
  public variantGenerated = new BehaviorSubject<boolean>(false);
  public getItemCategoryByIdData = new BehaviorSubject<AddItemCategory>({} as AddItemCategory);
  sendItemCategoryDataSource = new BehaviorSubject<GetItemCategoryDto[]>([]);
  public deleteAttrDifinitionData = new BehaviorSubject<any[]>([]);
  public tagLookup = new BehaviorSubject<{ id: number; name: string }[]>([]);
  public AccountsDropDownLookup = new BehaviorSubject<{ id: number; name: string }[]>([]);
  public uOMCategoryDropDown = new BehaviorSubject<[]>([]);
  public uOMCategoryDropDownById = new BehaviorSubject<[]>([]);
  public trackingTrackingDropDown = new BehaviorSubject<{ id: number; name: string }[]>([]);
  public taxesLookup = new BehaviorSubject<{ id: number; nameAr: string; nameEn: string }[]>([]);
  public taxesDataLookup = new BehaviorSubject<any[]>([]);

  public taxesEditDataLookup = new BehaviorSubject<any[]>([]);
  public getInventoryData = new BehaviorSubject<any>([]);
  public dataBarCodeById = new BehaviorSubject<any[]>([]);

  public dataFixedCostById = new BehaviorSubject<any[]>([]);
  public uomCodeLookup = new BehaviorSubject<UomCodeLookup[]>([]);
  public getuomById = new BehaviorSubject<addUOM>({} as addUOM);
  public ItemGetItemUomById = new BehaviorSubject<any[]>([]);
  public defaultUnit = new BehaviorSubject<{ id: number; name: string }>(
    {} as { id: number; name: string }
  );

  public exportedStockOutDataSource = new BehaviorSubject<StockInDto[]>([]);

  public dataFixedCostByIdObs = this.dataFixedCostById.asObservable();

  saveItemDefGeneral = new BehaviorSubject<AddGeneralDto>({} as AddGeneralDto);
  saveItemDefGeneral$ = this.saveItemDefGeneral.asObservable();
  getItemDefGeneral = new BehaviorSubject<AddGeneralDto>({} as AddGeneralDto);
  getItemDefGeneral$ = this.getItemDefGeneral.asObservable();
  sendSystemUnitLookup = new BehaviorSubject<
    { id: number; nameAr: string; nameEn: string; systemUnitOfMeasureCategoryId: number }[]
  >([]);
  sendSystemUnitLookup$ = this.sendSystemUnitLookup.asObservable();

  // end Edit form item Def
  // item category tree
  public parentItemCategoriesDropDown = new BehaviorSubject<{ id: number; name: string }[]>([]);
  parentItemCategoriesDropDown$ = this.parentItemCategoriesDropDown.asObservable();
  //transactions

  //transactions

  public codeByuomCodeDropDown = new EventEmitter<{ code: number; conversionRatio: string }>();
  public UOMCategoryDropDownLookup = new BehaviorSubject<{ id: number; name: string }[]>([]);
  public UOMDropDownLookup = new BehaviorSubject<{ id: number; nameEn: string }[]>([]);
  public UOMDropDownLookupByUomCategory = new BehaviorSubject<{ id: number; name: string }[]>([]);
  public UOMDropDownLookupByItemId = new BehaviorSubject<{ uomId: number; uomName: string }[]>([]);
  public ItemVariantsByItemIdDropDown = new BehaviorSubject<{ id: number; nameEn: string }[]>([]);

  public ItemVariantsById = new BehaviorSubject<[]>([]);
  public ItemAttributesById = new BehaviorSubject<AttributesVariants[]>([]);
  public EditItemAttributesData = new BehaviorSubject<EditAttributes>({} as EditAttributes);
  public addVariantLineData = new BehaviorSubject<any>('');
  public ActivateVairiantGroupData = new BehaviorSubject<boolean>(false);
  public sendAttributeVariantData = new BehaviorSubject<variantGroupById[]>([]);
  public sendBarcode = new BehaviorSubject<addBarcode>({} as addBarcode);
  public sendUOM = new BehaviorSubject<AddUom>({} as AddUom);
  public sendUOMCategory = new BehaviorSubject<addUOM>({} as addUOM);
  public getUOMCategoryByIdData = new BehaviorSubject<addUOM | any>({} as addUOM);
  public sendAttrDefinition = new BehaviorSubject<addAttributeDifintion>(
    {} as addAttributeDifintion
  );
  public sendOperationTag = new BehaviorSubject<AddOperatioalTag>({});
  public editOperationTag = new BehaviorSubject<AddOperatioalTag>({});
  public GetBarcode = new BehaviorSubject<getBarcodeById[]>([]);
  public GetItemByID = new BehaviorSubject<GetItemById>({} as GetItemById);
  public getOperationalTagItemsById = new BehaviorSubject<AddOperatioalTag>({});

  public GetUomListByItemId = new BehaviorSubject<getUomByItemId[]>([]);
  public sendDefault = new BehaviorSubject<boolean>(false);
  public editItemData = new BehaviorSubject<any>(false);
  public editItemFixedCostData = new BehaviorSubject<any>(false);

  public updateUOMobj = new BehaviorSubject<addUOM>({} as addUOM);
  public updateAttrobj = new BehaviorSubject<addAttributeDifintion>({} as addAttributeDifintion);
  public updateUOMByIdobj = new BehaviorSubject<any>({});
  public attributeNameDropDownLookup = new BehaviorSubject<any>([]);
  public attributeGroupeDropDownLookup = new BehaviorSubject<{ id: number; name: string }[]>([]);

  public sendlatestItemsList = new BehaviorSubject<LatestItems[]>([]);
  public latestItemsListByWarehouse = new BehaviorSubject<LatestItems[]>([]);
  public updateAddStockIn = new BehaviorSubject<AddStockIn>({} as AddStockIn);
  public attributeValuesDropDownLookup = new BehaviorSubject<ItemAttribute[]>([]);
  public attributeValuesData = new BehaviorSubject<itemAttributeValues[]>([]);
  private itemsDataSource = new BehaviorSubject<AdvancedSearchDto[]>([]);
  public itemsList = this.itemsDataSource.asObservable();
  private itemsDataSourceByWarehouse = new BehaviorSubject<AdvancedSearchDto[]>([]);
  public itemsListByWarehouse = this.itemsDataSourceByWarehouse.asObservable();

  public exportedItemDefinitionListDataSource = new BehaviorSubject<itemDefinitionDto[]>([]);
  // warehouse
  sendWarehouseDataSource = new BehaviorSubject<GetWarehouseList[]>([]);
  AddWarehouseDataSource = new BehaviorSubject<AddWarehouse>({} as AddWarehouse);
  sendWarehouseById = new BehaviorSubject<AddWarehouse>({} as AddWarehouse);

  WarehouseViewDataSource = new BehaviorSubject<GetWarehouseItems[]>([]);

  getWarehouseDataSourceById = new BehaviorSubject<WarehouseAccountData>(
    {} as WarehouseAccountData
  );
  exportedWarehouseDataSource = new BehaviorSubject<GetWarehouseList[]>([]);
  exportedItemCategoryDataSource = new BehaviorSubject<GetItemCategoryDto[]>([]);


  exportedWarehouseDataItemSource = new BehaviorSubject<GetWarehouseItems[]>([]);
  // transactions

  // lookups
  sendGlAccountLookup = new BehaviorSubject<any>([]);
  sendBranchesLookup = new BehaviorSubject<any>([]);
  wareHousesDropDownLookup = new BehaviorSubject<GetWarehouseList[]>([]);
  sendCitiesLookup = new BehaviorSubject<any>([]);
  sendCountriesLookup = new BehaviorSubject<any>([]);
  public sendOperationalTagDropDown = new BehaviorSubject<OperationalStockIn[]>([]);
  public sendItemBarcodeStockOut = new BehaviorSubject<any>({} as any);

  public SendexportUOMList = new BehaviorSubject<UOMCategoryDto[]>([]);
  public SendexportAttrDifinitionList = new BehaviorSubject<any[]>([]);
  public listOfUOM = new BehaviorSubject<IuomResult[]>([]);
  public listOfAttrDifinition = new BehaviorSubject<IAttrributeDifinitionResult[]>([]);
  public listOfOperationalTag = new BehaviorSubject<IOperationalTagResult[]>([]);
  public SendExportOperationalTagList = new BehaviorSubject<any[]>([]);

  public userSubDomainModules = new BehaviorSubject<any[]>([]);
  public sendItemDefinitionDataSourceObs = this.sendItemDefinitionDataSource.asObservable();
  public GetUOMCategoriesDataSourceObs = this.GetUOMCategoriesDataSource.asObservable();
  public ViewDataDefinitionByIdObs = this.ViewDataDefinitionById.asObservable();
  public SendexportUOMList$ = this.SendexportUOMList.asObservable();
  public wareHousesDropDownLookup$ = this.wareHousesDropDownLookup.asObservable();
  public SendexportAttrDifinitionList$ = this.SendexportAttrDifinitionList.asObservable();
  public itemTypeLookupObs = this.itemTypeLookup.asObservable();
  public ViewDataItemUomByIdObs = this.ViewDataItemUomById.asObservable();
  public deleteAttrDifinitionDataObs = this.deleteAttrDifinitionData.asObservable();
  public itemCategoryLookupObs = this.itemCategoryLookup.asObservable();
  public editItemFixedCostDataObs = this.editItemFixedCostData.asObservable();
  public AddItemCategoryLookupObs = this.AddItemCategoryLookup.asObservable();
  public itemsCategoryDeletedObs = this.itemsCategoryDeleted.asObservable();
  public EditItemCategoryDataObs = this.EditItemCategoryData.asObservable();
  public variantGeneratedObs = this.variantGenerated.asObservable();
  public getItemCategoryByIdDataObs = this.getItemCategoryByIdData.asObservable();
  public exportedItemDefinitionListDataSourceObs = this.exportedItemDefinitionListDataSource.asObservable()
  public sendItemCategoryDataSourceObs = this.sendItemCategoryDataSource.asObservable();
  public tagLookupObs = this.tagLookup.asObservable();
  public defaultUnitObs = this.defaultUnit.asObservable();
public exportedWarehouseDataItemSourceObs = this.exportedWarehouseDataItemSource.asObservable()
  public stockInDataViewSource = new BehaviorSubject<StockInDto[]>([]);
  public inventoryGeneralSetting = new BehaviorSubject<GeneralSettingDto>({} as GeneralSettingDto);

  inventoryGeneralSetting$ = this.inventoryGeneralSetting.asObservable();
  stockInDataViewSourceeObservable = this.stockInDataViewSource.asObservable();

  public ItemVariantsByIdObs = this.ItemVariantsById.asObservable();
  public ItemAttributesById$ = this.ItemAttributesById.asObservable();
  public EditItemAttributesData$ = this.EditItemAttributesData.asObservable();
  public AccountsDropDownLookupObs = this.AccountsDropDownLookup.asObservable();
  public taxesLookupObs = this.taxesLookup.asObservable();
  public uomCodeLookupObs = this.uomCodeLookup.asObservable();
  public updateUOMByIdobjObs = this.updateUOMByIdobj.asObservable();
  public getuomByIdObs = this.getuomById.asObservable();
  public uOMCategoryDropDownObs = this.uOMCategoryDropDown.asObservable();
  public trackingTrackingDropDownObs = this.trackingTrackingDropDown.asObservable();
  public codeByuomCodeDropDownObs = this.codeByuomCodeDropDown.asObservable();
  public UOMCategoryDropDownLookupObs = this.UOMCategoryDropDownLookup.asObservable();
  public UOMDropDownLookupObs = this.UOMDropDownLookup.asObservable();
  public UOMDropDownLookupByUomCategoryObs = this.UOMDropDownLookupByUomCategory.asObservable();
  public UOMDropDownLookupByItemIdObs = this.UOMDropDownLookupByItemId.asObservable();
  public ItemVariantsByItemIdDropDownObs = this.ItemVariantsByItemIdDropDown.asObservable();
  public sendDataDefinitionByIdObs = this.sendDataDefinitionById.asObservable();
  public attributeNameDropDownLookupObs = this.attributeNameDropDownLookup.asObservable();
  public attributeGroupeDropDownLookup$ = this.attributeGroupeDropDownLookup.asObservable();
  public sendOperationalTagDropDown$ = this.sendOperationalTagDropDown.asObservable();
  public latestItemsListByWarehouse$ = this.latestItemsListByWarehouse.asObservable();
  public updateAddStockIn$ = this.updateAddStockIn.asObservable();
  public attributeValuesDropDownLookupObs = this.attributeValuesDropDownLookup.asObservable();
  public attributeValuesDataObs = this.attributeValuesData.asObservable();
  public addVariantLineDataObs = this.addVariantLineData.asObservable();
  public publicActivateVairiantGroupDataObs = this.ActivateVairiantGroupData.asObservable();
  public sendAttributeVariantDataObs = this.sendAttributeVariantData.asObservable();
  public sendBarcodeObs = this.sendBarcode.asObservable();
  public sendUOMObs = this.sendUOM.asObservable();
  public sendUOMCategory$ = this.sendUOMCategory.asObservable();
  public getUOMCategoryByIdData$ = this.getUOMCategoryByIdData.asObservable();
  public sendAttrDefinition$ = this.sendAttrDefinition.asObservable();
  public GetBarcodeObs = this.GetBarcode.asObservable();
  public GetItemByIDObs = this.GetItemByID.asObservable();
  public GetUomListByItemIdObs = this.GetUomListByItemId.asObservable();
  public sendDefaultObs = this.sendDefault.asObservable();
  public editItemDataObs = this.editItemData.asObservable();
  public exportedItemCategoryDataSourceObs = this.exportedItemCategoryDataSource.asObservable();
  public ItemGetItemUomByIdObs = this.ItemGetItemUomById.asObservable();
  // warehouse
  public sendWarehouseDataSourceObs = this.sendWarehouseDataSource.asObservable();
  public AddWarehouseDataSourceObs = this.AddWarehouseDataSource.asObservable();
  public sendWarehouseByIdObs = this.sendWarehouseById.asObservable();
  public exportedWarehouseDataSourceObs = this.exportedWarehouseDataSource.asObservable();
  public WarehouseViewDataSourceObs = this.WarehouseViewDataSource.asObservable()
  // lookups
  public sendBranchesLookupObs = this.sendBranchesLookup.asObservable();
  public sendCitiesLookupObs = this.sendCitiesLookup.asObservable();
  public sendCountriesLookupObs = this.sendCountriesLookup.asObservable();

  public updateUOMobj$ = this.updateUOMobj.asObservable();
  public listOfUOMs = this.listOfUOM.asObservable();
  public listOfAttrDifinition$ = this.listOfAttrDifinition.asObservable();
  public updateAttrobj$ = this.updateAttrobj.asObservable();
  //OPERATIONAL TAG
  public listOfOperationalTag$ = this.listOfOperationalTag.asObservable();
  public sendOperationTag$ = this.sendOperationTag.asObservable();
  public editOperationTag$ = this.editOperationTag.asObservable();
  public getOperationalTagItemsById$ = this.getOperationalTagItemsById.asObservable();
  public SendExportOperationalTagList$ = this.SendExportOperationalTagList.asObservable();
  public uOMCategoryDropDownByIdObs = this.uOMCategoryDropDownById.asObservable();
  public userSubDomainModulesObs = this.userSubDomainModules.asObservable();
  public taxesDataLookupObs = this.taxesDataLookup.asObservable();
  public taxesEditDataLookupObs = this.taxesEditDataLookup.asObservable();
  public getInventoryData$ = this.getInventoryData.asObservable();
  public dataBarCodeByIdObs = this.dataBarCodeById.asObservable();
  sendItemBarcode = new BehaviorSubject<StockInDetail>({} as StockInDetail);

  public sendItemBarcode$ = this.sendItemBarcode.asObservable();
  public sendItemBarcodeStockOut$ = this.sendItemBarcodeStockOut.asObservable();

  public sendOperationalTagStockOutDropDown = new BehaviorSubject<{ id: number; name: string }[]>(
    []
  );
  public OperationalTagStockOut$ = this.sendOperationalTagStockOutDropDown.asObservable();

  getItemType(quieries: string, pageInfo: PageInfo) {
    this.itemProxy.getItemType(quieries, pageInfo).subscribe((response) => {
      this.sendItemTypeDataSource.next(response.result);
      this.currentPageInfo.next(response.pageInfoResult);
    });
  }

  OperationalTagDropDown() {
    return this.itemProxy.operationTagDropdown().subscribe((res) => {
      this.sendOperationalTagDropDown.next(res);
    });
  }

  getItemBarcodeForItem(barcode: string) {
    this.itemProxy.getItemBarcodeForItem(barcode).subscribe((res) => {
      this.sendItemBarcode.next(res);
    });
  }

  getItemBarcodeById(id: number) {
    this.itemProxy.getItemBarcodeById(id).subscribe({
      next: (res: any) => {
        this.dataBarCodeById.next(res);
      },
    });
  }

  getItemFixedCost(id: number) {
    this.itemProxy.getItemFixedCost(id).subscribe({
      next: (res: any) => {
        this.dataFixedCostById.next(res);
      },
    });
  }
  getItemDefinition(quieries: string, pageInfo: PageInfo) {
    this.itemProxy.getItemDefinition(quieries, pageInfo).subscribe(
      (response) => {
        this.sendItemDefinitionDataSource.next(response.result);
        this.currentPageInfo.next(response.pageInfoResult);
      },
      (erorr) => {}
    );
  }
  getUOmCategories(quieries: string, pageInfo: PageInfo) {
    this.itemProxy.GetUOMCategories(quieries, pageInfo).subscribe(
      (response) => {
        this.GetUOMCategoriesDataSource.next(response.result);
        this.currentPageInfo.next(response.pageInfoResult);
      },
      (erorr) => {}
    );
  }

  ViewDefinitionById(id: number) {
    // this.loaderService.show();
    this.itemProxy.getItemViewDefinitionById(id).subscribe((res) => {
      if (res) {
        this.ViewDataDefinitionById.next(res);
        // this.loaderService.hide();
      }
    });
  }
  getListOfUom(SearchTerm: string | undefined, pageInfo: PageInfo) {
    this.itemProxy.getListOfUom(SearchTerm, pageInfo).subscribe((response: Iuom) => {
      this.listOfUOM.next(response.result);
      this.currentPageInfo.next(response.pageInfoResult);
    });
  }
  getListOfAttr(SearchTerm: string | undefined, pageInfo: PageInfo) {
    this.itemProxy.getListOfAttr(SearchTerm, pageInfo).subscribe((response) => {
      this.listOfAttrDifinition.next(response.result);
      this.currentPageInfo.next(response.pageInfoResult);
    });
  }
  getOperationalTagList(SearchTerm: string, pageInfo: PageInfo) {
    this.itemProxy.getOperationalTagList(SearchTerm, pageInfo).subscribe((response) => {
      this.listOfOperationalTag.next(response.result);
      this.currentPageInfo.next(response.pageInfoResult);
    });
  }

  editStatusAttributeGroup(modle: any) {
    this.itemProxy.editStatusAttributeGroup(modle).subscribe((data: any) => {
      this.toasterService.showSuccess(
        this.languageService.transalte('attributeDefinition.success'),
        this.languageService.transalte('attributeDefinition.attributeEditStatus')
      );
    });
  }

  addItemDefinition(obj: AddItemDefinitionDto, dialogRef: DynamicDialogRef, text: string) {
    this.itemProxy.addItemDefinition(obj).subscribe((res) => {
      if (res) {

        this.toasterService.showSuccess(
          this.languageService.transalte('itemDefinition.success'),
          this.languageService.transalte('itemDefinition.add')
        );
        let dataRes: number = Number(res);
        if (text == 'save') {
          dialogRef.close(res);
        } else {
          this.router.navigateTo(`masterdata/add-item-definition/general/${dataRes}`);
          dialogRef.close();
        }
      }
    });
  }

  addVariantLine(obj: AddVariantLine) {
    this.itemProxy.addVariantLine(obj).subscribe((res) => {
      this.addVariantLineData.next(res);
      this.toasterService.showSuccess(
        this.languageService.transalte('itemDefinition.success'),
        this.languageService.transalte('itemDefinition.add')
      );
    });
  }

  getItemDefinitionById(id: number) {
    this.itemProxy.getItemViewDefinitionById(id).subscribe((res) => {
      if (res) {
        this.ViewDataDefinitionById.next(res);
      }
    });
  }

  exportsItemsDefinitionList(SearchTerm: string ,SortBy?: number, SortColumn?: string) {
    this.itemProxy.exportsItemsDefinitionList(SearchTerm,SortBy,SortColumn).subscribe({
      next: (res: any) => {
        this.exportedItemDefinitionListDataSource.next(res);
      },
    });
  }

  exportUOMList(SearchTerm?: string, SortBy?: number, SortColumn?: string) {
    this.itemProxy.ExportUOMList(SearchTerm).subscribe({
      next: (res: UOMCategoryDto[]) => {
        this.SendexportUOMList.next(res);
      },
    });
  }
  ExportOperationalTagList(SearchTerm: string ,SortBy?: number, SortColumn?: string) {
    this.itemProxy.ExportOperationalTagList(SearchTerm , SortBy ,SortColumn ).subscribe({
      next: (res: any) => {
        this.SendExportOperationalTagList.next(res);
      },
    });
  }

  exportAttrDifinitionList(SearchTerm: string ,SortBy?: number, SortColumn?: string) {
    this.itemProxy.ExporAttrList(SearchTerm , SortBy ,SortColumn).subscribe({
      next: (res: any) => {
        this.SendexportAttrDifinitionList.next(res);
      },
    });
  }
  itemTypeLookupData() {
    this.itemProxy.itemTypeLookup().subscribe({
      next: (res: any) => {
        this.itemTypeLookup.next(res);
      },
    });
  }
  ParentItemCategoriesDropDown(SearchTerm: string) {
    this.itemProxy.ParentItemCategoriesDropDown(SearchTerm).subscribe({
      next: (res: any) => {
        this.parentItemCategoriesDropDown.next(res);
      },
    });
  }

  getItemCategoryTreeList() {
    return this.itemProxy.getItemCategoryTreeList().pipe(
      map((res) => {
        return res;
      })
    );
  }

  getItemCategoryById(id: number) {
    this.itemProxy.getItemCategoryById(id).subscribe({
      next: (res: any) => {
        this.getItemCategoryByIdData.next(res);
      },
    });
  }
  getItemCategory(queries: string, pageInfo: PageInfo) {
    this.itemProxy.getItemCategory(queries, pageInfo).subscribe((response) => {
      this.sendItemCategoryDataSource.next(response.result);
      this.currentPageInfo.next(response.pageInfoResult);
    });
  }
  addItemCategory(obj: AddItemCategory) {
    this.itemProxy.addItemCategory(obj).subscribe({
      next: (res: any) => {
        this.AddItemCategoryLookup.next(res);
        this.toasterService.showSuccess(
          this.languageService.transalte('itemsCategory.success'),
          this.languageService.transalte('itemsCategory.addSuccess')
        );
      },
    });
  }

  editItemCategory(obj: AddItemCategory) {
    this.itemProxy.editItemCategory(obj).subscribe({
      next: (res: any) => {
        this.EditItemCategoryData.next(res);
        this.toasterService.showSuccess(
          this.languageService.transalte('itemsCategory.success'),
          this.languageService.transalte('itemsCategory.editSuccses')
        );
      },
    });
  }
  async deleteItemCategory(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.itemProxy.deleteItemCategory(id).subscribe({
        next: (res) => {
          this.itemsCategoryDeleted.next(true);

          this.toasterService.showSuccess(
            this.languageService.transalte('itemsCategory.success'),
            this.languageService.transalte('itemsCategory.delete')
          );
        },
      });
    }
  }

  ItemCategoryDropDown() {
    this.itemProxy.ItemCategoryDropDown().subscribe({
      next: (res: any) => {
        this.itemCategoryLookup.next(res);
      },
    });
  }
  tagDropDown() {
    this.itemProxy.tagDropDown().subscribe({
      next: (res: any) => {
        this.tagLookup.next(res);
      },
    });
  }
  AccountsDropDown() {
    this.itemProxy.AccountsDropDown().subscribe({
      next: (res: any) => {
        this.AccountsDropDownLookup.next(res);
      },
    });
  }
  taxesDropDropDown() {
    this.itemProxy.taxesDropDropDown().subscribe({
      next: (res: any) => {
        this.taxesLookup.next(res);
      },
    });
  }

  gettaxesDropDropDown(id: number) {
    this.itemProxy.getTaxDataDropDropDown(id).subscribe({
      next: (res: any) => {
        this.taxesDataLookup.next(res);
      },
      error: (err) => {
        this.taxesDataLookup.next([]);
      },
    });
  }

  editItemTax(obj: any) {
    this.itemProxy.editItemTax(obj).subscribe({
      next: (res: any) => {
        if (res) {
          this.taxesEditDataLookup.next(res);
          this.toasterService.showSuccess(
            this.languageService.transalte('UOM.success'),
            this.languageService.transalte('UOM.uomEdit')
          );
          // this.router.navigateTo(`/masterdata/uom` )
        }
      },
    });
  }
  editInventory(obj: any) {
    this.itemProxy.editInventory(obj).subscribe({
      next: (res: any) => {
        if (res) {
          this.taxesEditDataLookup.next(res);
          this.toasterService.showSuccess(
            this.languageService.transalte('itemType.success'),
            this.languageService.transalte('itemType.inventoryEdited')
          );
        }
      },
    });
  }
  getInvenrory(id: number) {
    this.itemProxy.getInvenrory(id).subscribe((res) => {
      if (res) {
        this.getInventoryData.next(res);
      }
    });
  }
  uomCodeDropDown(id: number) {
    this.itemProxy.uomCodeDropDown(id).subscribe({
      next: (res: any) => {
        this.uomCodeLookup.next(res);
      },
    });
  }
  getUomById(id: number) {
    this.itemProxy.getUomById(id).subscribe({
      next: (res: any) => {
        this.getuomById.next(res);
      },
    });
  }
  getUOMByCategoryID(id: number) {
    this.itemProxy.getUOMByCategoryID(id).subscribe({
      next: (res: any) => {
        this.getuomById.next(res);
      },
    });
  }
  getUOMCategoryDropDown() {
    this.itemProxy.getUOMCategoryDropDown().subscribe({
      next: (res: any) => {
        this.uOMCategoryDropDown.next(res);
      },
    });
  }
  getUOMCategoryDropDownCategoryId(id: number) {
    this.itemProxy.getGetUOMsByUOMCategoryId(id).subscribe({
      next: (res: any) => {
        this.uOMCategoryDropDownById.next(res);
      },
    });
  }

  getCodeByuomCodeDropDown(id: number) {
    return this.itemProxy.getCodeByuomCodeDropDown(id);

    // .subscribe({
    //   next: (res: any) => {
    //     this.codeByuomCodeDropDown.next(res);
    //   },
    // });
  }
  getTrackingDropDown() {
    this.itemProxy.getTrackingDropDown().subscribe({
      next: (res: any) => {
        this.trackingTrackingDropDown.next(res);
      },
    });
  }
  UOMCategoryDropDown() {
    this.itemProxy.UOMCategoryDropDown().subscribe({
      next: (res: any) => {
        this.UOMCategoryDropDownLookup.next(res);
      },
    });
  }
  getUomDropDown() {
    this.itemProxy.getUomDropDown().subscribe({
      next: (res: any) => {
        this.UOMDropDownLookup.next(res);
      },
    });
  }
  getUomDropDownByUomCategory(id: number) {
    this.itemProxy.getUomDropDownByUomCategory(id).subscribe({
      next: (res: any) => {
        this.UOMDropDownLookupByUomCategory.next(res);
      },
    });
  }
  getUomDropDownByUomItemId(id: number) {
    this.itemProxy.getUomDropDownByUomItemId(id).subscribe({
      next: (res: any) => {
        this.UOMDropDownLookupByItemId.next(res);
      },
    });
  }
  getItemVariantsByItemIdDropDown(id: number) {
    this.itemProxy.getItemVariantsByItemIdDropDown(id).subscribe({
      next: (res: any) => {
        this.ItemVariantsByItemIdDropDown.next(res);
      },
    });
  }

  getItemVariants(id: number) {
    this.itemProxy.getItemVariants(id).subscribe({
      next: (res: any) => {
        this.ItemVariantsById.next(res);
      },
    });
  }
  getItemAttributes(id: number) {
    this.itemProxy.getItemAttributes(id).subscribe({
      next: (res: any) => {
        this.ItemAttributesById.next(res);
      },
    });
  }
  EditItemAttributes(obj: EditAttributes) {
    this.itemProxy.EditItemAttributes(obj).subscribe({
      next: (res: any) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('itemType.success'),
          this.languageService.transalte('itemType.AttributeAdded')
        );
        this.EditItemAttributesData.next(res);
        this.ItemGetItemUomById.next(res);
      },
    });
  }

  getItemGetItemUomById(id: number) {
    this.itemProxy.getItemGetItemUomById(id).subscribe({
      next: (res: any) => {
        this.ItemGetItemUomById.next(res);
      },
    });
  }

  getUserSubDomainModules() {
    this.itemProxy.getUserSubDomainModules().subscribe({
      next: (res: any) => {
        this.userSubDomainModules.next(res);
      },
    });
  }

  updatetemGetItemUomById(obj: any) {
    return this.itemProxy.updateItemGetItemUomById(obj).subscribe((res) => {
      if (res) {
        this.updateUOMByIdobj.next(res);
        this.toasterService.showSuccess(
          this.languageService.transalte('UOM.success'),
          this.languageService.transalte('UOM.uomEdit')
        );
        // this.router.navigateTo(`/masterdata/uom` )
      }
    });
  }
  getDefaultUnit(id: number, itemId: number) {
    this.itemProxy.getDefaultUnit(id, itemId).subscribe((res) => {
      if (res) {
        this.defaultUnit.next(res);
      }
    });
  }

  attributeGroups() {
    this.itemProxy.attributeGroups().subscribe({
      next: (res: any) => {
        this.attributeNameDropDownLookup.next(res);
      },
    });
  }
  AttributeGroupDropDown() {
    this.itemProxy.AttributeGroupDropDown().subscribe({
      next: (res: any) => {
        this.attributeGroupeDropDownLookup.next(res);
      },
    });
  }

  attributeGroupsValue(id: number) {
    this.itemProxy.attributeGroupsValue(id).subscribe({
      next: (res: any) => {
        this.attributeValuesDropDownLookup.next(res);
      },
    });
  }
  attributeGroupsValuesData(id: number) {
    this.itemProxy.attributeGroupsGetAttributes(id).subscribe({
      next: (res: any) => {
        this.attributeValuesData.next(res);
      },
    });
  }

  ActivateVairiantGroup(obj: any) {
    this.itemProxy.ActivateVairiantGroup(obj).subscribe((res) => {
      this.toasterService.showSuccess(
        this.languageService.transalte('itemType.success'),
        this.languageService.transalte('itemType.changeVariantStatus')
      );
    });
  }
  ActivateOperationalTag(obj: any) {
    this.itemProxy.ActivateOperationalTag(obj).subscribe((res) => {
      this.toasterService.showSuccess(
        this.languageService.transalte('itemType.success'),
        this.languageService.transalte('itemType.changeVariantStatus')
      );
    });
  }
  ActivateBarcode(obj: any) {
    this.itemProxy.ActivateBarcode(obj).subscribe((res) => {
      this.toasterService.showSuccess(
        this.languageService.transalte('itemType.success'),
        this.languageService.transalte('itemType.changeBarcodeStatus')
      );
    });
  }
  ActivateAttrDefinition(obj: any) {
    this.itemProxy.ActivateAttrDifinition(obj).subscribe((res) => {
      this.toasterService.showSuccess(
        this.languageService.transalte('attributeDefinition.success'),
        this.languageService.transalte('attributeDefinition.changeAttributrDifinitionStatus')
      );
    });
  }
  systemUnitLookup() {
    this.itemProxy.systemUnitLookup().subscribe((res) => {
      if (res) {
        this.sendSystemUnitLookup.next(res);
      }
    });
  }

  ActivateUOM(obj: any) {
    this.itemProxy.ActivateUOM(obj).subscribe((res) => {
      this.toasterService.showSuccess(
        this.languageService.transalte('UOM.success'),
        this.languageService.transalte('UOM.changeAttributrDifinitionStatus')
      );
    });
  }

  async deleteItemDefinition(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.itemProxy.deleteItemDefinition(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('itemDefinition.success'),
            this.languageService.transalte('itemDefinition.delete')
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
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.itemProxy.deleteAttrDifinition(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('attributeDefinition.success'),
            this.languageService.transalte('attributeDefinition.delete')
          );

          const currentAttrDif = this.attributeValuesDropDownLookup.getValue();
          const updatedAttrDif = currentAttrDif.filter((c: any) => c.id !== id);
          this.attributeValuesDropDownLookup.next(updatedAttrDif);
        },
      });
    }
  }

  async deleteAttrDifinitionWithId(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.itemProxy.deleteAttrDifinition(id).subscribe((data: any) => {
        this.deleteAttrDifinitionData.next(data);
      });
    }
  }

  EditUOMCategory(obj: addUOM) {
    this.itemProxy.EditUOMCategory(obj).subscribe((res) => {
      this.router.navigateTo(`/masterdata/uom`);

      this.toasterService.showSuccess(
        this.languageService.transalte('UOM.success'),
        this.languageService.transalte('UOM.EditUomSuccess')
      );
      this.sendUOMCategory.next(res);
    });
  }
  async deleteCategory(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.itemProxy.deleteCategory(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('UOM.success'),
            this.languageService.transalte('UOM.delete')
          );

          const currentUom = this.GetUOMCategoriesDataSource.getValue();
          const updatedUOM = currentUom.filter((c: any) => c.uomCategoryId !== id);
          this.GetUOMCategoriesDataSource.next(updatedUOM);
        },
      });
    }
  }

  async deleteUom(id: string) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.itemProxy.deleteUOM(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('UOM.success'),
            this.languageService.transalte('UOM.delete')
          );
          const currentList = this.GetUOMCategoriesDataSource.getValue();;
          const updatedList = currentList.filter((c: any) => c.id !== id);
          this.GetUOMCategoriesDataSource.next(updatedList);
        },
      });
    }
  }
  // deleteAttributeGroup delete
  async deleteAttributeGroup(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.itemProxy.deleteAttributeGroup(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('attributeDefinition.success'),
            this.languageService.transalte('attributeDefinition.delete')
          );

          const currentAttr = this.listOfAttrDifinition.getValue();
          const updatedattr = currentAttr.filter((c: any) => c.id !== id);
          this.listOfAttrDifinition.next(updatedattr);
        },
      });
    }
  }

  getAttributeVariantById(id: number) {
    this.itemProxy.getAttributeVariantById(id).subscribe((res) => {
      this.sendAttributeVariantData.next(res);
    });
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
            this.languageService.transalte('itemType.deleteVariant')
          );
          const currentVariant = this.ItemAttributesById.getValue();
          const updatedVariants = currentVariant.filter((c) => c.id !== id);
          this.ItemAttributesById.next(updatedVariants);
        },
      });
    }
  }

  async deleteBarcode(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.itemProxy.deleteBarcode(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('itemType.success'),
            this.languageService.transalte('itemType.deleteBarcode')
          );
          const currentVariant: any = this.ItemVariantsById.getValue();
          const updatedVariants = currentVariant.filter((c: any) => c.variantId !== id);
          this.ItemVariantsById.next(updatedVariants);
        },
      });
    }
  }

  addBarcode(obj: addBarcode) {
    this.itemProxy.addBarcode(obj).subscribe((res) => {
      this.toasterService.showSuccess(
        this.languageService.transalte('itemType.success'),
        this.languageService.transalte('itemType.barcodesuccess')
      );
      this.sendBarcode.next(res);
    });
  }
  addUOM(obj: AddUom) {
    this.itemProxy.addUOM(obj).subscribe((res) => {
      this.toasterService.showSuccess(
        this.languageService.transalte('UOM.success'),
        this.languageService.transalte('UOM.uomSuccess')
      );
      this.sendUOM.next(res);
    });
  }
  addUOMCategory(obj: addUOM) {
    this.itemProxy.addUOMCategory(obj).subscribe((res) => {
      this.router.navigateTo(`/masterdata/uom`);

      this.toasterService.showSuccess(
        this.languageService.transalte('UOM.success'),
        this.languageService.transalte('UOM.uomSuccess')
      );
      this.sendUOMCategory.next(res);
    });
  }
  getUOMCategoryById(id: number) {
    this.itemProxy.getUOMCategoryById(id).subscribe((res) => {
      if (res) {
        this.getUOMCategoryByIdData.next(res);
      }
    });
  }
  addAttrDifintion(obj: addAttributeDifintion) {
    this.itemProxy.addAttrDifinition(obj).subscribe((res) => {
      this.toasterService.showSuccess(
        this.languageService.transalte('attributeDefinition.success'),
        this.languageService.transalte('attributeDefinition.successAdd')

      );
      this.sendAttrDefinition.next(res);
      this.router.navigateTo('/masterdata/attribute-definition');
    });
  }

  getBarcodeByItemId(id: number) {
    return this.itemProxy.getBarcodeByItemId(id).subscribe((res) => {
      this.GetBarcode.next(res);
    });
  }
  getItemById(id: number) {
    return this.itemProxy.getItemById(id).subscribe((res) => {
      if (res) {
        this.GetItemByID.next(res);
      }
    });
  }

  getUomByItemId(id: number) {
    return this.itemProxy.getUomByItemId(id).subscribe((res) => {
      this.GetUomListByItemId.next(res);
    });
  }
  getAllUomByItemId(id: number) {
    return this.itemProxy.getAllUomByItemId(id).subscribe((res) => {
      this.GetUomListByItemId.next(res);
    });
  }

  setUomDefault(obj: UomDefault) {
    return this.itemProxy.setUomDefault(obj).subscribe((res) => {
      this.toasterService.showSuccess(
        this.languageService.transalte('itemType.success'),
        this.languageService.transalte('itemType.statusuom')
      );

      this.sendDefault.next(res);
    });
  }
  generateVariant(obj: any) {
    return this.itemProxy.generateVariant(obj).subscribe((res) => {
      this.variantGenerated.next(true);
      this.toasterService.showSuccess(
        this.languageService.transalte('itemType.success'),
        this.languageService.transalte('itemType.variantSuccess')
      );
    });
  }
  editItem(obj: any) {
    return this.itemProxy.editItem(obj).subscribe((res) => {
      if (res) {
        this.editItemData.next(res);
        this.toasterService.showSuccess(
          this.languageService.transalte('itemType.success'),
          this.languageService.transalte('itemType.itemEdit')
        );
        this.router.navigateTo(`/masterdata/item-definition`);
      }
    });
  }

  editItemFixedCost(obj: any) {
    return this.itemProxy.editItemFixedCost(obj).subscribe((res) => {
      if (res) {
        this.editItemFixedCostData.next(res);
        this.toasterService.showSuccess(
          this.languageService.transalte('itemDefinition.success'),
          this.languageService.transalte('itemDefinition.editFixedCost')
        );
        this.router.navigateTo(`/masterdata/item-definition`);
      }
    });
  }

  //  warehouse
  getWarehouseList(queries: string, pageInfo: PageInfo) {
    this.itemProxy.getWarehouseList(queries, pageInfo).subscribe((response) => {
      this.sendWarehouseDataSource.next(response.result);
      this.currentPageInfo.next(response.pageInfoResult);
    });
  }
  getWarehouseListView(queries: string, warehouseId:number, pageInfo: PageInfo) {
    this.itemProxy.getWarehouseView(queries  , warehouseId, pageInfo).subscribe((response) => {
      this.WarehouseViewDataSource.next(response.result);
      this.currentPageInfo.next(response.pageInfoResult);
    });
  }
  // addWarehouse(obj : AddWarehouse) {
  //   this.itemProxy.addWarehouse(obj).subscribe((response) => {
  //     this.toasterService.showSuccess(
  //       this.languageService.transalte('warehouse.success'),
  //       this.languageService.transalte('warehouse.add')
  //     );

  //     this.router.navigateTo(`/masterdata/warehouse` )

  //    });
  // }
  addWarehouse(obj: AddWarehouse, dialogRef: DynamicDialogRef, text: string) {
    this.itemProxy.addWarehouse(obj).subscribe((res) => {
      if (res) {
        this.toasterService.showSuccess(
          this.languageService.transalte('warehouse.success'),
          this.languageService.transalte('warehouse.add')
        );

        let dataRes: number = Number(res);
        if (text == 'save') {
          dialogRef.close(res);
        } else {
          this.router.navigateTo(`/masterdata/warehouse/edit-warehouse/${dataRes}`);

          dialogRef.close();
        }
      }
    });
  }
  editWarehouse(obj: EditWareHouse) {
    this.itemProxy.editWarehouse(obj).subscribe((response) => {
      this.toasterService.showSuccess(
        this.languageService.transalte('warehouse.success'),
        this.languageService.transalte('warehouse.edit')
      );
    });
    this.router.navigateTo(`/masterdata/warehouse`);
  }

  getWarehouseById(id: number) {
    this.itemProxy.getWarehouseById(id).subscribe((response) => {
      if (response) {
        this.sendWarehouseById.next(response);
      }
    });
  }

  exportsWayehouseList(searchTerm?: string, SortBy?: number, SortColumn?: string) {
    this.itemProxy.exportsWayehouseList(searchTerm, SortBy, SortColumn).subscribe({
      next: (res: any) => {
        this.exportedWarehouseDataSource.next(res);
      },
    });
  }

  exportsWayehouseItemView(warehouseId?: number, SortBy?: any, SortColumn?: any) {
    this.itemProxy.exportsWayehouseItemView(warehouseId, SortBy, SortColumn).subscribe({
      next: (res: any) => {
        this.exportedWarehouseDataItemSource.next(res);
      },
    });
  }
  exportsItemCategoryList(searchTerm?: string, SortBy?: number, SortColumn?: string) {
    this.itemProxy.exportsItemCategoryList(searchTerm , SortBy, SortColumn).subscribe({
      next: (res: any) => {
        this.exportedItemCategoryDataSource.next(res);
      },
    });
  }
  async deleteWareHouse(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.itemProxy.deleteWareHouse(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('warehouse.success'),
            this.languageService.transalte('warehouse.delete')
          );

          const currentWarehouse = this.sendWarehouseDataSource.getValue();
          const updatedWarehouse = currentWarehouse.filter((c) => c.id !== id);
          this.sendWarehouseDataSource.next(updatedWarehouse);
        },
      });
    }
  }

  getWareHousesDropDown() {
    return this.itemProxy.getWareHousesDropDown().subscribe((res) => {
      this.wareHousesDropDownLookup.next(res);
    });
  }
  getBranchDropdown() {
    return this.itemProxy.getBranchDropdown().subscribe((res) => {
      this.sendBranchesLookup.next(res);
    });
  }
  getCitiesDropdown(id: string) {
    return this.itemProxy.getCitiesDropdown(id).subscribe((res) => {
      this.sendCitiesLookup.next(res);
    });
  }
  getCcountriesDropdown() {
    return this.itemProxy.getCcountriesDropdown().subscribe((res) => {
      this.sendCountriesLookup.next(res);
    });
  }
  updateUOM(obj: any) {
    return this.itemProxy.updateUOM(obj).subscribe((res) => {
      if (res) {
        this.updateUOMobj.next(res);
        this.toasterService.showSuccess(
          this.languageService.transalte('UOM.success'),
          this.languageService.transalte('UOM.uomEdit')
        );
        this.router.navigateTo(`/masterdata/uom`);
      }
    });
  }
  updateAttrDifinition(obj: addAttributeDifintion) {
    return this.itemProxy.updateAttrDifinition(obj).subscribe((res) => {
      if (res) {
        this.updateAttrobj.next(res);
        this.toasterService.showSuccess(
          this.languageService.transalte('attributeDefinition.success'),
          this.languageService.transalte('attributeDefinition.successUpdate')
        );

        // this.router.navigateTo(`/masterdata/item-definition` )
      }
    });
  }

  // operational tag

  getOperationalTagById(id: number) {
    return this.itemProxy.getOperationalTagById(id).subscribe((res) => {
      if (res) {
        this.getOperationalTagItemsById.next(res);
      }
    });
  }

  addOperationTag(obj: AddOperatioalTag) {
    this.itemProxy.addOperationTag(obj).subscribe((res) => {
      this.sendOperationTag.next(res);
      this.toasterService.showSuccess(
        this.languageService.transalte('OperationalTag.SuccessDone'),
        this.languageService.transalte('OperationalTag.SuccessAdd')
      );
    });
  }
  editOperationalTag(obj: AddOperatioalTag) {
    return this.itemProxy.editOperationalTag(obj).subscribe((res) => {
      if (res) {
        this.editItemData.next(res);
        this.toasterService.showSuccess(
          this.languageService.transalte('OperationalTag.SuccessDone'),
          this.languageService.transalte('OperationalTag.Success')
        );
        this.router.navigateTo(`/masterdata/operational-tag`);
      }
    });
  }

  saveItemDefinitionGeneral(obj: AddGeneralDto) {
    this.itemProxy.saveItemDefinitionGeneral(obj).subscribe((res) => {
      if (res) {
        this.getItemDefGeneral.next(res);
        this.toasterService.showSuccess(
          this.languageService.transalte('itemDefinition.success'),
          this.languageService.transalte('itemDefinition.editGenerl')
        );
      }
    });
  }
  getItemDefinitionGeneral(id: number) {
    this.itemProxy.getItemDefinitionGeneral(id).subscribe((res) => {
      if (res) {
        this.getItemDefGeneral.next(res);
      }
    });
  }

  async deleteOperationalTag(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.itemProxy.deleteOperationalTag(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('OperationalTag.delete'),
            this.languageService.transalte('OperationalTag.Success')
          );

          const currentOperationTag = this.listOfOperationalTag.getValue();
          const updatedOperationTag = currentOperationTag.filter((c) => c.id !== id);
          this.listOfOperationalTag.next(updatedOperationTag);
        },
      });
    }
  }
  editInventoryGeneralSetting(obj: GeneralSettingDto) {
    this.itemProxy.editInventoryGeneralSetting(obj).subscribe({
      next: (res: GeneralSettingDto) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('generalSetting.success'),
          this.languageService.transalte('generalSetting.updated')
        );
      },
    });
  }
  getInventoryGeneralSetting() {
    this.itemProxy.getInventoryGeneralSetting().subscribe({
      next: (res: GeneralSettingDto) => {
        if (res) {
          this.inventoryGeneralSetting.next(res);
        }
      },
    });
  }
}
