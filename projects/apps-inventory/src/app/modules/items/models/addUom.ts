export interface AddUom {
  itemUOMs: ItemUom[]
}

export interface ItemUom {
  itemId: number
  uomId: number
  conversionRatio: number
  isDefault: boolean
  isSales: boolean
  isPurchase: boolean
}

  
  export interface UomPost {
    code?: string
    nameAr?: string
    nameEn?: string
    shortName?: string
    uomType?: string
    uomCategoryId?: number
    conversionRatio?: number
    isActive?:boolean
  }