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
  code: string
  uomCategoryNameAr: string
  uomCategoryNameEn: string
  uoMs: UoM[]
}

export interface UoM {
  nameAr: string
  nameEn: string
  shortName: string
  uomType: string
  uomCategoryId: number
  conversionRatio: number
  conversionUOM: number
  isDefault: boolean
}
