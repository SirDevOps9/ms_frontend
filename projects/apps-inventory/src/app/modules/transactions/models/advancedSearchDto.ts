export interface AdvancedSearchDto {
    itemId: number
    itemCode: string
    itemName: string
    uomId: string
    uomCode: string
    uomNameAr: string
    uomNameEn: string
    itemVariantId: number
    itemVariantCode: string
    itemVariantName: string
    itemCategoryNameAr: string
    itemCategoryNameEn: string
    categoryId: number
    categoryType: string
    hasExpiryDate: boolean
    taxId: number
    taxRatio: number
    price: number
    trackingType: string
    itemsUOM: ItemsUomList[]
  }
  
  export interface ItemsUomList {
    itemUOMId: number
    itemId: number
    uomId: string
    uomCode: string
    uomNameAr: string
    uomNameEn: string
  }
  