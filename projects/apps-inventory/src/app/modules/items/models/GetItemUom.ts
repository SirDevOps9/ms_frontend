export interface GetItemUom {
  itemId: number;
  uomCategoryId: number;
  uoms: {
    uomId: number;
    nameAr: string;
    nameEn: string;
    shortName: string;
    conversionRatio: number;
    unitUsages: any[][];
    isActive: boolean;
    isBaseUnit: boolean;
  };
}
