

export interface addFixedCost {
  itemId: number
  itemFixedCosts: FixedCost[]
}

export interface FixedCost {
  itemId: number
  id: number
  uomId: string
  itemVariantId: number
  fixedCost: string
}
