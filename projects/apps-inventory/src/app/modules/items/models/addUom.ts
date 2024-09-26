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
