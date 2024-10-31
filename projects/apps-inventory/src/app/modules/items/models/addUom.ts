export interface AddUom {
  itemUOMs: ItemUom[]
}

export interface ItemUom {
  id? :number;
  itemId: number
  uomId: number
  conversionRatio: number
  isDefault: boolean
  isSales: boolean
  isPurchase: boolean
}

  
export interface addUOM {
  nameEn: string
  nameAr: string
  unitOfMeasures: UoM[]
  uoMs?: UoM[]
}

export interface UoM {
  id : string,
  code: string;
  nameAr: string;
  nameEn: string;
  shortName: string;
  isBaseUnit: boolean;
  factor: number;
  calculation: string;
  reversal: string;
  uomCategoryId: number;
  systemUnitOfMeasureId: string;
  fromUnitOfMeasureId: string;
  fromUnitOfMeasureNameEn? : string
  fromUnitOfMeasureNameAr? : string
  baseCalculation? : string
  baseReversal? : string
}
