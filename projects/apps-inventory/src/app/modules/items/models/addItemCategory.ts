export interface AddItemCategory {
    id? :number
    code: string
    nameAr: string
    nameEn: string
    parentCategoryId: number
    isDetailed: boolean
    isActive: boolean
    categoryType: string
    glAccountId: number
    cashSalesAccountId: number
    creditSalesAccountId: number
    salesReturnAccountId: number
    purchaseAccountId: number
    salesCostAccountId: number
    discountAccountId: number
    evaluationAccountId: number
    adjustmentAccountId: number
    goodsInTransitAccountId: number,
    parentCategoryNameEn? : string
  }
  