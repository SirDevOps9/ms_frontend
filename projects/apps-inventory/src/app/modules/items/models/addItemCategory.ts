export interface AddItemCategory {
    id? :number
    code?: string
    nameAr: string
    nameEn: string
    parentCategoryId: number
    isDetailed: boolean
    isActive: boolean
    categoryType: string
    purchaseAccountId: number
    costOfGoodSoldAccountId: number
  }
  