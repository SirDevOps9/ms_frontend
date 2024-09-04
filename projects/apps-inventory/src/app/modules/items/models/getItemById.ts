export interface GetItemById {
    id: number
    code: string
    name: string
    shortName: string
    warranty: number
    isVatApplied: boolean
    color: string
    specialCare: string
    countryId: any
    countryName: string
    typeId: number
    categoryId: number
    uomId: number
    photo: string
    trackingId: number
    hasExpiryDate: boolean
    lifeTime: number
    tags: any[]
    uoMs: any
    itemAccounting: ItemAccounting
    defaultUOMCategoryId : number
  }
  
  export interface ItemAccounting {
    pAccount: number
    prAccount: number
    sAccount: number
    srAccount: number
  }
  