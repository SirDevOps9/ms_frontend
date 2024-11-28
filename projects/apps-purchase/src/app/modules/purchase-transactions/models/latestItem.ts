
export interface LatestItem {
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
  taxId: any
  taxRatio: any
  price: number
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
