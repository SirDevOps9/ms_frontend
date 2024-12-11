
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
  itemVariantNameAr: string
  itemVariantNameEn: string
  itemCategoryNameAr: string
  itemCategoryNameEn: string
  categoryId: number
  categoryType: string
  hasExpiryDate: boolean
  cost: number
  trackingType: string
  trackingNo: string
  totalQuantity: number
  createdOn: string
  expiryDate: string
  taxId: number
  taxRatio: number
  trackingList: TrackingList[]
  itemsUOM: ItemsUom[]
}

export interface TrackingList {
  trackingType: string
  trackingNo: string
  expiryDate: string
  totalQuantity: number
  cost: number
}

export interface ItemsUom {
  itemUOMId: number
  itemId: number
  uomId: string
  uomCode: string
  uomNameAr: string
  uomNameEn: string
}
