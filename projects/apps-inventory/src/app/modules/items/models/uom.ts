export interface Iuom {
    pageInfoResult: any
    orderBy: any
    orderByDesc: boolean
    result: IuomResult[]
  }
  
 
  export interface IuomResult {
    id: number
    code: string
    name: string
    shortName: string
    uomType: string
    uomCategoryId: number
    conversionRatio: number
    conversionUOM: number
    isActive: boolean
  }
  