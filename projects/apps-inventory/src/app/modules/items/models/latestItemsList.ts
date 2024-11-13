
export interface LatestItems {
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
  itemsUOM: ItemsUom[]
}

export interface ItemsUom {
  itemUOMId: number
  itemId: number
  uomId: string
  uomCode: string
  uomNameAr: string
  uomNameEn: string
}
